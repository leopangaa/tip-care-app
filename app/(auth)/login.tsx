import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import {Link, router} from "expo-router";
import {useState} from "react";

export default function LoginScreen() {
    const [loading, setLoading] = useState(true);
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
                        <TouchableOpacity  onPress={() => router.push("/signup")} className="py-2 px-12 mr-2 flex">
                            <Text>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View className="mb-2">
                        <Text>Username</Text>
                    </View>
                    <View>
                        <View className="bg-gray-200 border-black border rounded-xl py-2 px-3 mb-4">
                            <TextInput
                                className="text-[15px]"
                                placeholder="Enter your username                                 "
                                placeholderTextColor="gray"

                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View className="mb-2">
                        <Text>Password</Text>
                    </View>
                    <View>
                        <View className="bg-gray-200 border-black border rounded-xl py-2 px-3 mb-8">
                            <TextInput
                                className="text-[15px]"
                                placeholder="Enter your password                                 "
                                placeholderTextColor="gray"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => router.push("/(tabs)")}
                                      className="bg-[#0077CC] py-2 px-20 rounded-xl w-full mb-3">
                        <Text className="text-white font-semibold text-[17px]">Log In</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-around mb-2">
                    <View>
                        <Text>Don't have an account? </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => router.push("/signup")}>
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
