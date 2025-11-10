import {View, Text, Image, TouchableOpacity, ScrollView, Modal} from "react-native";
import {useRouter} from "expo-router";
import {logout} from ".././utils/authStorage";
import {useEffect, useState} from "react";
import {getCurrentUser, User} from "@/app/utils/userStorage";

const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const today = new Date();

    const dateToday = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getMemberSince = () => {
        return new Date().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
    };

    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (modalVisible) {
            loadUserData();
        }
    }, [modalVisible]);

    const loadUserData = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error("Error loading user data:", error);
        } finally {
            setLoading(false);
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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">TIP Care</Text>
                                <Text className="text-sm text-gray-600 mt-1">Your mental wellness companion</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true)
                    }}
                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                </TouchableOpacity>


            </View>
            <ScrollView className="space-y-3 px-5">

                <Text className="text-lg font-bold text-[#0077CC] mt-7 text-center text-[26px]">
                    Welcome back!
                </Text>

                <View
                    className="bg-white rounded-full flex-row items-center justify-center mt-4 py-3 px-5 shadow-sm">
                    <Image
                        source={require("@/assets/icons/calendar.png")}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                    <Text className="text-[#0077CC] font-medium text-[14px]">
                        {dateToday}
                    </Text>
                </View>

                <View className="bg-white rounded-2xl p-5 mt-5 shadow">
                    <View className="flex-row items-center mb-3">
                        <Image
                            source={require("@/assets/icons/checkin.png")}
                            className="w-10 h-10 mr-2"
                            resizeMode="contain"
                            tintColor="#0077CC"
                        />
                        <Text className="text-[#0077CC] font-semibold text-base">Daily Check-In</Text>
                    </View>
                    <Text className="text-gray-600 text-sm mb-4">
                        Take a moment to check in with yourself. How are you feeling today?
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/mood")}
                        className="bg-[#0077CC] rounded-xl py-3 items-center">
                        <View className="flex-row items-center">
                            <Image
                                source={require("@/assets/icons/star.png")}
                                className="w-5 h-5 mr-2"
                                resizeMode="contain"
                                tintColor="#FFFFFF"
                            />
                            <Text className="text-white font-semibold text-sm">Start Daily Check-in</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text className="text-[#0077CC] font-semibold mt-6 mb-2 text-base">
                    Quick Actions
                </Text>

                <View>
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/mood")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/mood.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#FF607A"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Log Mood</Text>
                                <Text className="text-gray-500 text-xs">Track how you are feeling today</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/journal")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/journal.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#C4B72B"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Write Journal</Text>
                                <Text className="text-gray-500 text-xs">Express your thoughts privately</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/relax")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/relax.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#AACE97"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Relax</Text>
                                <Text className="text-gray-500 text-xs">
                                    Breathing exercises & motivation
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-[#0077CC] font-semibold mt-6 mb-2 text-base">
                    Support Resources
                </Text>

                <View className="space-y-3 mb-10">
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/clinics")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/emergency.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#F02629"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">
                                    Emergency Support
                                </Text>
                                <Text className="text-gray-500 text-xs">
                                    Immediate help & hotlines
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/clinics")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/clinics.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#CB4DF5"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Find Clinics</Text>
                                <Text className="text-gray-500 text-xs">
                                    Mental health professionals
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-blue-100">
                    {/* Header */}
                    <View className="bg-[#0077CC] pt-12 flex-row">
                        <View className="p-4">
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mr-4"
                                onPress={() => setModalVisible(false)}
                            >
                                <Image
                                    source={require("@/assets/icons/close.png")}
                                    className="w-6 h-6 mx-3 my-3"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="justify-center w-full">
                            <Text className="text-white text-xl font-extrabold">PROFILE</Text>
                        </View>
                    </View>

                    {/* Content */}
                    <View className="flex-1 px-6 pt-8 pb-6">
                        {/* Profile Header */}
                        <View className="items-center mb-8">
                            <View className="relative mb-4">
                                <View className="w-28 h-28 rounded-full bg-gradient-to-r from-[#0077CC] to-[#0096FF] justify-center items-center shadow-lg">
                                    <Image
                                        source={require("@/assets/icons/profile.png")}
                                        className="w-24 h-24 rounded-full mb-4"
                                        resizeMode="contain"
                                        tintColor="#0077CC"
                                    />
                                </View>
                                <View className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                                    <View className="w-6 h-6 rounded-full bg-green-400 justify-center items-center">
                                        <Text className="text-white text-xs font-bold">✓</Text>
                                    </View>
                                </View>
                            </View>

                            <Text className="text-3xl font-bold text-gray-800 text-center mb-1">
                                {user?.fullName || "Guest User"}
                            </Text>
                            <Text className="text-lg text-gray-600 mb-2">
                                @{user?.username || "username"}
                            </Text>
                            <View className="bg-blue-100 rounded-full px-4 py-1">
                                <Text className="text-[#0077CC] text-xs font-semibold">
                                    Member since {getMemberSince()}
                                </Text>
                            </View>
                        </View>

                        {/* Info Cards */}
                        <View className="space-y-4 mb-8">
                            {/* Personal Info Card */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
                                <View className="flex-row items-center mb-3">
                                    <View className="w-8 h-8 bg-blue-100 rounded-lg justify-center items-center mr-3">
                                        <Text className="text-[#0077CC] text-lg font-bold">i</Text>
                                    </View>
                                    <Text className="text-lg font-bold text-gray-800">Personal Information</Text>
                                </View>

                                <View className="space-y-3">
                                    <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                                        <View>
                                            <Text className="text-gray-500 text-sm">Full Name</Text>
                                            <Text className="text-gray-800 font-semibold">
                                                {user?.fullName || "Not set"}
                                            </Text>
                                        </View>
                                        <TouchableOpacity className="p-2">
                                            <Text className="text-[#0077CC] text-sm font-semibold">Edit</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                                        <View>
                                            <Text className="text-gray-500 text-sm">Username</Text>
                                            <Text className="text-gray-800 font-semibold">
                                                @{user?.username || "Not set"}
                                            </Text>
                                        </View>
                                        <TouchableOpacity className="p-2">
                                            <Text className="text-[#0077CC] text-sm font-semibold">Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {/* Account Status Card */}
                            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <View className="flex-row items-center mb-3">
                                    <View className="w-8 h-8 bg-green-100 rounded-lg justify-center items-center mr-3">
                                        <Text className="text-green-600 text-lg font-bold">✓</Text>
                                    </View>
                                    <Text className="text-lg font-bold text-gray-800">Account Status</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-gray-500 text-sm">Status</Text>
                                        <Text className="text-green-600 font-bold text-base">Active</Text>
                                    </View>
                                    <View className="bg-green-100 rounded-full px-3 py-1">
                                        <Text className="text-green-700 text-xs font-semibold">Verified</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Logout Button */}
                        <TouchableOpacity
                            onPress={handleLogout}
                            className="bg-red-500 rounded-full py-3 flex-row justify-center items-center shadow-lg"
                        >
                            <Image
                                source={require("@/assets/icons/logout.png")}
                                className="w-5 h-5 mr-2"
                                resizeMode="contain"
                                tintColor="#FFFFFF"
                            />
                            <Text className="text-white font-bold text-lg">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Index;
