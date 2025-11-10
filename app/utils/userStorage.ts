import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users_data';
const CURRENT_USER_KEY = '@current_user';

export interface User {
    fullName: string;
    username: string;
    password: string;
}

export const storeUser = async (user: User): Promise<boolean> => {
    try {
        const existingUsers = await getUsers();
        // Check if username already exists
        if (existingUsers.find(u => u.username === user.username)) {
            return false; // Username exists
        }

        const updatedUsers = [...existingUsers, user];
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
        return true;
    } catch (error) {
        console.error('Error storing user:', error);
        return false;
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
};

export const verifyUser = async (username: string, password: string): Promise<User | null> => {
    try {
        const users = await getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        return user || null;
    } catch (error) {
        console.error('Error verifying user:', error);
        return null;
    }
};

export const setCurrentUser = async (user: User): Promise<void> => {
    try {
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error setting current user:', error);
    }
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

export const clearCurrentUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
        console.error('Error clearing current user:', error);
    }
};