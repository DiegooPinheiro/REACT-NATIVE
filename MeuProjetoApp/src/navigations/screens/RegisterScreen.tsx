import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

export default function RegisterScreen({navigation}: {navigation: any}) {

    useEffect(() => {
        console.log('RegisterScreen montado');
        return () => {
            console.log('RegisterScreen desmontado');
        };
    }, []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [telefone, setTelefone] = useState('');

    function handleRegister() {
        // Validação dos campos
        if (!username.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o nome de usuário');
            return;
        }
        if (!email.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o email');
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Erro', 'Email inválido');
            return;
        }
        if (!idade.trim()) {
            Alert.alert('Erro', 'Por favor, preencha a idade');
            return;
        }
        if (parseInt(idade) < 18) {
            Alert.alert('Erro', 'Você deve ter no mínimo 18 anos');
            return;
        }
        if (!telefone.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o telefone');
            return;
        }
        if (telefone.length < 11) {
            Alert.alert('Erro', 'Telefone inválido');
            return;
        }

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Idade:', idade);
        console.log('telefone', telefone)
    
        Alert.alert('Bem-vindo, ' + username + '!');
        //Limpar Formulário
        setUsername('');
        setEmail('');
        setIdade('');
        setTelefone('');
    }

    function handleClear() {
        setUsername('');
        setEmail('');
        setIdade('');
        setTelefone('');
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Tela de Cadastro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={username}
                    onChangeText={setUsername} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address" />
                <TextInput
                    style={styles.input}
                    placeholder="Idade"
                    value={idade}
                    onChangeText={setIdade}
                    keyboardType="numeric" />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="numeric" />
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Cadastrar"
                        onPress={handleRegister}
                        color="#4CAF50" />
                    <Pressable 
                        style={styles.buttonLimpar}
                        onPress={handleClear}>
                        <Text style={styles.buttonLimparText}>Limpar</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    },
    title: {
    fontSize: 24,
    marginBottom: 20,
    },
    input: { 
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    },
    buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    marginTop: 10,
    },
    buttonLimpar: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    },
    buttonLimparText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    }
});
