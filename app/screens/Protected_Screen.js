import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function ProtectedScreen({ navigation }) {
    const userSignOut = () => {
        console.log('Action => User Signing Out ');
        Alert.alert('Action', 'User Signing Out');
        // navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>Welcome to</Text>
            <Text style={styles.title3}>Find And Play App</Text>
            <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => userSignOut()}
            >
                <Text style={styles.title2}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'mediumseagreen',
    },
    touchableButton: {
        backgroundColor: 'seagreen',
        borderRadius: 20,
        margin: 120,
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    title1: {
        fontSize: 20,
    },
    title2: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
    },
    title3: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 150,
    },
});
