import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


type User = {
    id: string;
    nome: string;
    email: string;
    idade: string;
    phone: string;
};

export default function ListScreen() {
    const [users, setUsers] = useState<User[]>([]);
    // READ - carregar usuários ao focar na tela
    useFocusEffect(
        useCallback(() => {
            carregarUsuarios();
        }, [])
    );
    async function carregarUsuarios() {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            const loadedUsers = storedUsers ? JSON.parse(storedUsers) : [];
            setUsers(loadedUsers);
        } catch (error) {
            Alert.alert('Erro', `Falha ao carregar usuários: ${error}`);
        }
    }   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Usuários Cadastrados</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => ( 
                    <View style={styles.userCard}>
                        <Text style={styles.userName}>{item.nome}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Idade: {item.idade}</Text>
                        <Text>Telefone: {item.phone}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhum usuário cadastrado.</Text>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    userCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
