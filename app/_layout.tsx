import {SplashScreen, Stack} from "expo-router";
import "./global.css";
import {StatusBar} from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true}/>

            <Stack initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="SplashScreen"
                />
                <Stack.Screen
                    name="(auth)"
                />
                <Stack.Screen
                    name="(tabs)"
                />
            </Stack>
        </>
    )
}
