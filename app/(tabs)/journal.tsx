import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import SearchBar from "@/components/SearchBar";

const Journal = () => {
    return (
        <View className="flex-1 bg-blue-100">
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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Personal Journal</Text>
                                <Text className="text-sm text-gray-600 mt-1">Your private space for reflection</Text>
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

            <View className="p-5">
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
                    className="space-y-3 p-1"
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity className="bg-white rounded-2xl p-4 mt-5">
                        <View className="flex-row items-center">
                            <View>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    MIDTERM EXAM WEEK</Text>
                            </View>
                            <TouchableOpacity>
                                <View>
                                    <Image
                                        source={require("@/assets/icons/note.png")}
                                        className="w-7 h-7 mr-2 ml-16"
                                        resizeMode="contain"
                                        />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View>
                                    <Image
                                        source={require("@/assets/icons/trash.png")}
                                        className="w-7 h-7 mr-2"
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            className="rounded-full flex-row mt-2 mb-4">
                            <Image
                                source={require("@/assets/icons/calendar.png")}
                                className="w-5 h-5 mr-2"
                                resizeMode="contain"
                                tintColor="gray"
                            />
                            <Text className="text-grey font-medium text-sm mb-4">
                                Monday, October 6, 2025
                            </Text>
                        </View>

                        <Text className="text-gray-600 text-sm">
                            pagod na pagod na pagod na pagod
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default Journal;