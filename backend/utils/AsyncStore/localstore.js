import AsyncStorage from '@react-native-async-storage/async-storage';

const createSessionData = async (data, userID) => {
    try {
        const sessionData = JSON.stringify(data);
        await AsyncStorage.setItem(userID, sessionData);
    } catch (error) {
        console.log(`@Error createSessionData`);
        console.log(error);
    }
    console.log('createSessionData success');
};

const readSessionData = async (userID) => {
    try {
        const sessionData = await AsyncStorage.getItem(userID);
        return sessionData != null ? JSON.parse(sessionData) : null;
    } catch (error) {
        console.log(`@Error readSessionData`);
        console.log(error);
    }
    console.log('readSessionData success');
};

const deleteSessionData = async (userID) => {
    try {
        await AsyncStorage.removeItem(userID);
    } catch (error) {
        console.log(`@Error deletingSessionData`);
        console.log(error);
    }
    console.log('deleteSessionData success');
};

module.exports = { readSessionData, createSessionData, deleteSessionData };
