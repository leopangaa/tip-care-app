import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import SearchBar from "@/components/SearchBar";

const Journal = () => {
    return (
        <View className="flex-1 bg-blue">
            <View
                className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm">
                <View>
                    <Text className="text-2xl font-extrabold text-[#0077CC]">Journal</Text>
                    <Text className="text-sm text-gray-600 mt-1">Personal Diary</Text>
                </View>

                <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <View className="space-y-3 p-5">
                <SearchBar
                    placeholder="Search entries"
                />

                <TouchableOpacity
                    className="bg-[#0077CC] rounded-full py-3 items-center mt-5">
                    <View className="flex-row items-center">
                        <Image
                            source={require("@/assets/icons/plus.png")}
                            className="w-5 h-5 mr-2"
                            resizeMode="contain"
                            tintColor="#FFFFFF"
                        />
                        <Text className="text-white font-semibold text-sm">New Entry</Text>
                    </View>
                </TouchableOpacity>

                <ScrollView
                    className="space-y-3"
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="bg-white rounded-2xl p-4 mt-5">
                        <View className="flex-row items-center">
                            <View>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    MIDTERM EXAM WEEK</Text>
                            </View>
                        </View>

                        <View
                            className="rounded-full flex-row mt-2 mb-4">
                            <Image
                                source={require("@/assets/icons/calendar.png")}
                                className="w-5 h-5 mr-2"
                                resizeMode="contain"
                                tintColor="grey"
                            />
                            <Text className="text-grey font-medium text-sm mb-4">
                                Monday, October 6, 2025
                            </Text>
                        </View>

                        <Text className="text-gray-600 text-sm">
                            pagod na pagod na pagod na pagod
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Journal;