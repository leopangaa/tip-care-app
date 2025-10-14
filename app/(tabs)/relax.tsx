import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from "react";

const Relax = () => {
    return (
        <View className="flex-1 bg-white">
            <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm">
                <View>
                    <Text className="text-2xl font-extrabold text-[#0077CC]">Relax</Text>
                    <Text className="text-sm text-gray-600 mt-1">Calm your mind</Text>
                </View>

                <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow">
                    <Image
                        source={require("@/assets/icons/profile.png")} // replace with your profile icon
                        className="w-9 h-9"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-700 font-medium">
                    Welcome to the Relax Page!
                </Text>
            </View>
        </View>
    )
}

export default Relax;