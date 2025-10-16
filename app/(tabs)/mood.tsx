import {View, Text, TouchableOpacity, Image} from 'react-native';

const Mood = () => {
    return (
        <View className="flex-1 bg-white">
            <View
                className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm mt-0.5">
                <View className="mt-4">
                    <View className="flex-row items-center">
                        <View>
                            <View className="mr-2">
                                <Image
                                    source={require("@/assets/icons/heart.png")}
                                    className="w-10 h-10"
                                    resizeMode="contain"
                                    tintColor="#0077CC"
                                />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Mood Tracker</Text>
                                <Text className="text-sm text-gray-600 mt-1">Track your emotional journal</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Mood;