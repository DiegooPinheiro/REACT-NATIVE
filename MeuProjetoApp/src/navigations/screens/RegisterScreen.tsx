import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

    function handleRegister() {
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Idade:', idade);
    
        Alert.alert('Bem-vindo, ' + username + '!');
        //Limpar Formulário
        setUsername('');
        setEmail('');
        setIdade('');
    }
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>
        <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
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
        <Button
            title="Cadastrar"
            onPress={handleRegister}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
    }
});
