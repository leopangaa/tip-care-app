import {View, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import {router} from "expo-router";
import {useState} from "react";
import {storeUser, setCurrentUser} from "@/app/utils/userStorage";
import {setLoggedIn} from "@/app/utils/authStorage";

export default function SignupScreen() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        if (!fullName || !username || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password should be at least 6 characters long!");
            return;
        }

        setIsLoading(true);

        try {
            const newUser = {
                fullName,
                username,
                password
            };

            const isStored = await storeUser(newUser);

            if (isStored) {
                await setCurrentUser(newUser);
                await setLoggedIn(true);
                Alert.alert("Success", "Account created successfully!");
                router.replace("/(tabs)");
            } else {
                Alert.alert("Error", "Username already exists!");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to create account. Please try again.");
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
                        <TouchableOpacity
                            onPress={() => router.push("/login")}
                            className="py-2 px-12 mr-3 flex"
                            disabled={isLoading}
                        >
                            <Text>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("/signup")}
                            className="bg-white rounded-2xl py-2 px-12 mr-2 flex"
                            disabled={isLoading}
                        >
                            <Text>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="self-stretch px-6">
                    <View className="mb-2">
                        <Text>Full Name</Text>
                    </View>
                    <View>
                        <View className="bg-gray-200 border-black border rounded-xl py-2 px-3 mb-4">
                            <TextInput
                                className="text-[15px]"
                                placeholder="Enter your full name"
                                placeholderTextColor="gray"
                                value={fullName}
                                onChangeText={setFullName}
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </View>
                <View className="self-stretch px-6">
                    <View className="mb-2">
                        <Text>Username</Text>
                    </View>
                    <View>
                        <View className="bg-gray-200 border-black border rounded-xl py-2 px-3 mb-4">
                            <TextInput
                                className="text-[15px]"
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
                    <View className="mb-2">
                        <Text>Password</Text>
                    </View>
                    <View>
                        <View className="bg-gray-200 border-black border rounded-xl py-2 px-3 mb-8">
                            <TextInput
                                className="text-[15px]"
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
                        onPress={handleSignup}
                        disabled={isLoading}
                        className="bg-[#0077CC] py-2 px-20 rounded-xl w-full mb-3"
                    >
                        <Text className="text-white font-semibold text-[17px] text-center">
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-around mb-6">
                    <View>
                        <Text>Already have an account? </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push("/login")}
                            disabled={isLoading}
                        >
                            <Text className="text-blue-500 underline text">
                                Log In.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}