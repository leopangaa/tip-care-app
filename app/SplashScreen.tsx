import { Redirect } from "expo-router";
import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Text, View} from 'react-native';

const SplashScreen = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 2 seconds
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-blue-100 p-6">
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return <Redirect href="/(auth)/login" />;
};

export default SplashScreen;
