import * as FileSystem from 'expo-file-system';

const DATA_DIR = `${FileSystem.documentDirectory}data`;
const USERS_FILE = `${DATA_DIR}/users.json`;

// Criar diretório se não existir
async function ensureDirectoryExists() {
  const dirInfo = await FileSystem.getInfoAsync(DATA_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(DATA_DIR, { intermediates: true });
  }
}

// READ - Carregar todos os usuários
export async function loadUsers() {
  try {
    await ensureDirectoryExists();
    const fileInfo = await FileSystem.getInfoAsync(USERS_FILE);
    
    if (fileInfo.exists) {
      const content = await FileSystem.readAsStringAsync(USERS_FILE);
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [];
  }
}

// CREATE - Salvar novo usuário
export async function saveUser(newUser: any) {
  try {
    await ensureDirectoryExists();
    const users = await loadUsers();
    users.push(newUser);
    
    await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('Arquivo salvo em:', USERS_FILE);
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
}

// UPDATE - Atualizar usuário existente
export async function updateUser(userId: string, updatedUser: any) {
  try {
    await ensureDirectoryExists();
    const users = await loadUsers();
    const index = users.findIndex((user: any) => user.id === userId);
    
    if (index !== -1) {
      users[index] = updatedUser;
      await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(users, null, 2));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return false;
  }
}

// DELETE - Remover usuário
export async function deleteUser(userId: string) {
  try {
    await ensureDirectoryExists();
    const users = await loadUsers();
    const filtered = users.filter((user: any) => user.id !== userId);
    
    await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return false;
  }
}

// Obter caminho do arquivo (para debug)
export function getUsersFilePath() {
  return USERS_FILE;
}
