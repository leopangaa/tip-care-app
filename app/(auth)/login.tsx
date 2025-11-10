import {View, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import {router} from "expo-router";
import {useState} from "react";
import {setLoggedIn} from "@/app/utils/authStorage";
import {verifyUser, setCurrentUser} from "@/app/utils/userStorage";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password are required!");
            return;
        }

        setIsLoading(true);

        try {
            const user = await verifyUser(username, password);

            if (user) {
                await setCurrentUser(user);
                await setLoggedIn(true);
                router.replace("/(tabs)");
            } else {
                Alert.alert("Error", "Invalid username or password!");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-blue-100 p-6">
            <View className="flex-row items-center justify-around mb-6">
                <Image
                    source={require("@/assets/icons/heart.png")}
                    className="h-20 w-20 mr-1"
                    resizeMode="contain"
                    tintColor="#0077CC"
                />
                <Text className="text-[#0077CC] font-extrabold text-[50px]">TIPCare</Text>
            </View>
            <View className="bg-white rounded-xl py-3 items-center self-stretch px-2">
                <View className="bg-gray-200 rounded-2xl items-center justify-center py-2 mb-7 mt-2">
                    <View className="flex-row px-2">
                        <TouchableOpacity onPress={() => router.push("/login")} className="bg-white rounded-2xl py-2 px-12 mr-3 flex">
                            <Text>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/signup")} className="py-2 px-12 mr-2 flex">
                            <Text>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="self-stretch px-6">
                    <View className="mb-4">
                        <Text className="mb-1">Username</Text>
                        <View className="bg-gray-200 border border-black rounded-xl px-3">
                            <TextInput
                                className="text-[15px] py-2 w-full"
                                placeholder="Enter your username"
                                placeholderTextColor="gray"
                                value={username}
                                onChangeText={setUsername}
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </View>
                <View className="self-stretch px-6">
                    <View className="mb-8">
                        <Text className="mb-1">Password</Text>
                        <View className="bg-gray-200 border border-black rounded-xl px-3">
                            <TextInput
                                className="text-[15px] py-2 w-full"
                                placeholder="Enter your password"
                                placeholderTextColor="gray"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={isLoading}
                        className="bg-[#0077CC] py-2 px-20 rounded-xl w-full mb-3"
                    >
                        <Text className="text-white font-semibold text-[17px] text-center">
                            {isLoading ? "Logging in..." : "Log In"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-around mb-6">
                    <View>
                        <Text>Don&#39;t have an account? </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push("/signup")}
                            disabled={isLoading}
                        >
                            <Text className="text-blue-500 underline text">
                                Sign Up.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}