import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useEffect } from 'react';

export default function HomeScreen({navigation}: {navigation: any}) {
    useEffect(() => {
        console.log('HomeScreen montado');
        return () => {
            console.log('HomeScreen desmontado');
        };
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Meu Projeto App!</Text>
      <Text style={styles.text}>Escolha uma opção abaixo:</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Ir para Cadastro"
        onPress={() => navigation.navigate('Register')}
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
    text: {
    fontSize: 18, 
    marginBottom: 10,
    textAlign: 'center',
    }
});
