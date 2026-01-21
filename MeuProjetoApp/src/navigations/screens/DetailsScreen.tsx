import { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({navigation}: {navigation: any}) {
    useEffect(() => {
        console.log('DetailsScreen montado');
        return () => {
            console.log('DetailsScreen desmontado');
        }
    }, []);
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>
      <Text style={styles.text}>Aqui estão os detalhes do item selecionado.</Text>
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