import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { Clipboard, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Clinics = () => {
    const router = useRouter();

    const handlePhonePress = (phoneNumber: string) => {
        Clipboard.setString(phoneNumber);
        alert('Phone number copied to clipboard');
    };

    const handleWebsitePress = async (website: string) => {
        try {
            const url = website.startsWith('http') ? website : `https://${website}`;
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                alert(`Cannot open URL: ${url}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Clinics Directory</Text>
                                <Text className="text-sm text-gray-600 mt-1">Metro Manila mental health services</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
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
                    placeholder="Search clinics"
                />

                <ScrollView
                    className="space-y-6 p-2"
                    contentContainerStyle={{
                        paddingBottom: 200,
                        paddingTop: 10,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* NCMH Card */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <View className="flex-row items-center">
                            <TouchableOpacity>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    National Center for Mental Health (NCMH)
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-red-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">Emergency</Text>
                            </View>
                            <View className="bg-red-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">Hospital</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Nueve de Pebrero St., Mauway, Mandaluyong City</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Mon-Fri 8AM-5PM, 24/7 Crisis Hotline</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-4 justify-center mx-5">
                            <View className="bg-blue-500 rounded-xl p-2 mr-3">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handlePhonePress('(02) 8531-9001')}>
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">(02) 8531-9001</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-xl p-2">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handleWebsitePress('ncmh.gov.ph')}>
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">ncmh.gov.ph</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* PMHA Card */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <View className="flex-row items-center">
                            <TouchableOpacity>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    Philippine Mental Health Association, Inc. (PMHA)
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-blue-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">Non-Profit</Text>
                            </View>
                            <View className="bg-green-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">Clinical Services</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">18 East Ave., Diliman, Quezon City</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Mon-Fri 8AM-5PM</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-5 justify-center mx-5">
                            <View className="bg-blue-500 rounded-xl p-2 mr-3">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handlePhonePress('0917-565-2036')}>
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">0917-565-2036</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-xl p-2">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handleWebsitePress('pmha.org.ph')}>
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">pmha.org.ph</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* iPsych Inc. Card */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <View className="flex-row items-center">
                            <TouchableOpacity>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    iPsych Inc.
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-purple-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">Online Consultation</Text>
                            </View>
                            <View className="bg-yellow-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">In-Person</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Centuria Medical Makati, Makati City</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Weekdays 8AM-9PM, Weekends 8AM-5PM</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-5 justify-center mx-5">
                            <View className="bg-blue-500 rounded-xl p-2 mr-3">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handlePhonePress('+63 966-208-7074')}>
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">+63 966-208-7074</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-xl p-2">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handleWebsitePress('ipsych.ph')}>
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">ipsych.ph</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* MindCare Club Card */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <View className="flex-row items-center">
                            <TouchableOpacity>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    MindCare Club
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-purple-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">Teleconsultation</Text>
                            </View>
                            <View className="bg-green-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">24/7 Scheduling</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Pasig City (Online Services)</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">24/7 Scheduling Available</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-5 justify-center mx-5">
                            <View className="bg-blue-500 rounded-xl p-2 mr-3">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handlePhonePress('0917-775-9279')}>
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">0917-775-9279</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-xl p-2">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handleWebsitePress('mindcareclub.org')}>
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">mindcareclub.org</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Metro Psych Facility Card */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <View className="flex-row items-center">
                            <TouchableOpacity>
                                <Text className="text-[#0077CC] font-semibold text-[20px]">
                                    Metro Psych Facility
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-red-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">24/7 Facility</Text>
                            </View>
                            <View className="bg-blue-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">Hospital</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">520 Dr. Sixto Antonio Avenue, Pasig City</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">24/7 Service</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-5 justify-center mx-5">
                            <View className="bg-blue-500 rounded-xl p-2 mr-3">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handlePhonePress('(02) 643-6006')}>
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">(02) 643-6006</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-xl p-2">
                                <TouchableOpacity className="flex-row items-center" onPress={() => handleWebsitePress('metropsych.net')}>
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-3 h-3 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold text-xs">metropsych.net</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Clinics;
