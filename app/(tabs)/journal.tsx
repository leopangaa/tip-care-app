import {View, Text, TouchableOpacity, Image} from 'react-native';
import Mood from "@/app/(tabs)/mood";

const Journal = () => {
    return (
        <View className="flex-1 bg-white">
            <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm">
                <View>
                    <Text className="text-2xl font-extrabold text-[#0077CC]">Journal</Text>
                    <Text className="text-sm text-gray-600 mt-1">Personal Diary</Text>
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
                    Welcome to the Journal Page!
                </Text>
            </View>
        </View>
    )
}

export default Journal;