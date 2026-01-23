import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [phone, setPhone] = useState('');

  // Validação de e-mail com REGEX
  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validação de telefone (10 ou 11 dígitos)
  function isValidPhone(phone: string) {
    const phoneNumbers = phone.replace(/\D/g, '');
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumbers);
  }

  // CREATE - salvar no AsyncStorage
  async function saveUser() {
    try {
      const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        idade,
        phone,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
      };

      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];

      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));

      console.log('Usuário salvo:', newUser);
      console.log('Total de usuários:', users.length);

      Alert.alert('Sucesso', `Usuário ${nome} salvo com sucesso!`);

      // Limpa formulário
      setNome('');
      setEmail('');
      setIdade('');
      setPhone('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
      console.error('Erro ao salvar:', error);
    }
  }

  // READ - carregar usuários
  async function carregarUsuarios() {
    try {
      console.log('Tentando carregar usuários...');
      const storedUsers = await AsyncStorage.getItem('users');
      
      console.log('Dados brutos do AsyncStorage:', storedUsers);
      
      if (!storedUsers) {
        console.log('Nenhum dado encontrado no AsyncStorage');
        Alert.alert('Info', 'Nenhum usuário salvo ainda');
        return;
      }

      const users = JSON.parse(storedUsers);
      console.log('Usuários parseados:', users);
      
      if (!Array.isArray(users) || users.length === 0) {
        Alert.alert('Info', 'Nenhum usuário salvo ainda');
        return;
      }

      const usersList = users.map((u: any, i: number) => 
        `${i + 1}. ${u.nome} - ${u.email} (${u.idade} anos)`
      ).join('\n');
      
      Alert.alert(
        'Usuários Salvos',
        `Total: ${users.length}\n\n${usersList}`
      );
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', `Falha ao carregar usuários: ${error}`);
    }
  }

  // Fluxo principal
  function handleSave() {
    if (!nome || !email || !idade || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Erro', 'Telefone deve conter 10 ou 11 dígitos.');
      return;
    }

    saveUser();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={handleSave} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          color="red"
          onPress={() => {
            setNome('');
            setEmail('');
            setIdade('');
            setPhone('');
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ver Usuários Salvos"
          color="blue"
          onPress={() => carregarUsuarios()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
