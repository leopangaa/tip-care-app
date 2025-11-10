import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Entry = {
    id: string;
    title: string;
    content: string;
    date: string;
};

const Journal = () => {
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [entryText, setEntryText] = useState("");
    const [entryTitle, setEntryTitle] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const STORAGE_KEY = "@journal_entries";

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const savedEntries = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedEntries) {
                const parsed: Entry[] = JSON.parse(savedEntries);

                const updated = parsed.map((entry) => ({
                    id: entry.id || Date.now().toString() + Math.random().toString(36).substring(2, 9),
                    title: entry.title,
                    content: entry.content,
                    date: entry.date,
                }));

                setEntries(updated);
                await saveEntriesToStorage(updated);
            }
        } catch (error) {
            console.error("Failed to load entries:", error);
        }
    };

    const saveEntriesToStorage = async (entriesToSave: Entry[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entriesToSave));
        } catch (error) {
            console.error("Failed to save entries:", error);
        }
    };

    const today = new Date();
    const dateToday = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const openNewEntry = () => {
        setEntryText("");
        setEntryTitle("");
        setEditingId(null);
        setModalVisible(true);
    };

    const openEditEntry = (id: string) => {
        const entry = entries.find((e) => e.id === id);
        if (!entry) return;
        setEntryText(entry.content);
        setEntryTitle(entry.title);
        setEditingId(id);
        setModalVisible(true);
    };

    const saveEntry = () => {
        if (!entryText.trim()) return;

        let updated: Entry[] = [];
        if (editingId) {
            // Edit existing
            updated = entries.map((entry) =>
                entry.id === editingId
                    ? {
                        ...entry,
                        title: entryTitle.trim() || entry.title,
                        content: entryText.trim(),
                        date: dateToday,
                    }
                    : entry
            );
        } else {
            const newEntry: Entry = {
                id: Date.now().toString(),
                title: entryTitle.trim() || `Journal Entry #${entries.length + 1}`,
                content: entryText.trim(),
                date: dateToday,
            };
            updated = [...entries, newEntry];
        }

        setEntries(updated);
        saveEntriesToStorage(updated);
        setEntryText("");
        setEntryTitle("");
        setEditingId(null);
        setModalVisible(false);
    };

    const deleteEntry = () => {
        if (!editingId) return;
        const updated = entries.filter((entry) => entry.id !== editingId);
        setEntries(updated);
        saveEntriesToStorage(updated);
        setEntryText("");
        setEntryTitle("");
        setEditingId(null);
        setModalVisible(false);
    };

    const filteredEntries = entries.filter(
        (entry) =>
            entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-blue-100">
            {/* Header */}
            <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm mt-0.5">
                <View className="mt-4 flex-row items-center">
                    <Image
                        source={require("@/assets/icons/heart.png")}
                        className="w-10 h-10 mr-2"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                    <View>
                        <Text className="text-2xl font-extrabold text-[#0077CC]">
                            Personal Journal
                        </Text>
                        <Text className="text-sm text-gray-600 mt-1">
                            Your private space for reflection
                        </Text>
                    </View>
                </View>
            </View>

            {/* Search & Add */}
            <View className="p-5">
                <SearchBar
                    placeholder="Search entries"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    onPress={openNewEntry}
                    className="bg-[#0077CC] rounded-full py-3 items-center mt-5"
                >
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

                {/* Entries list */}
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {filteredEntries.map((entry) => (
                        <TouchableOpacity
                            key={entry.id}
                            onPress={() => openEditEntry(entry.id)}
                            className="bg-white rounded-2xl p-4 mt-5 border"
                        >
                            <View className="flex-row items-center justify-between">
                                <Text className="text-[#0077CC] font-semibold text-[18px]">
                                    {entry.title}
                                </Text>
                            </View>
                            <View className="flex-row items-center mt-2 mb-4">
                                <Image
                                    source={require("@/assets/icons/calendar.png")}
                                    className="w-5 h-5 mr-2"
                                    resizeMode="contain"
                                    tintColor="gray"
                                />
                                <Text className="text-gray-500 text-sm">{entry.date}</Text>
                            </View>
                            <Text className="text-gray-600 text-sm" numberOfLines={3}>
                                {entry.content}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1 bg-blue-100"
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Modal Header */}
                        <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm">
                            <View className="flex-row items-center">
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
                                <View>
                                    <Text className="text-2xl font-extrabold text-[#0077CC]">
                                        {editingId ? "Edit Note" : "New Note"}
                                    </Text>
                                    <Text className="text-sm text-gray-600 mt-1">{dateToday}</Text>
                                </View>
                            </View>

                            <View className="flex-row gap-3 mt-4">
                                {editingId && (
                                    <TouchableOpacity
                                        className="w-10 h-10 rounded-full bg-white justify-center items-center shadow"
                                        onPress={deleteEntry}
                                    >
                                        <Image
                                            source={require("@/assets/icons/trash.png")}
                                            className="w-6 h-6"
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow"
                                    onPress={saveEntry}
                                >
                                    <Image
                                        source={require("@/assets/icons/check.png")}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Form */}
                        <View className="px-6 mt-6">
                            <Text className="text-gray-700 mb-2 font-semibold">Title:</Text>
                            <View className="bg-white rounded-xl p-3 shadow mb-4">
                                <TextInput
                                    placeholder="Entry title"
                                    value={entryTitle}
                                    onChangeText={setEntryTitle}
                                    className="text-gray-800 text-base"
                                />
                            </View>

                            <Text className="text-gray-700 mb-2 font-semibold">
                                Your thoughts:
                            </Text>
                            <View className="bg-white rounded-xl p-4 shadow">
                                <TextInput
                                    multiline
                                    placeholder="Write your journal entry here..."
                                    value={entryText}
                                    onChangeText={setEntryText}
                                    className="text-gray-800 text-base"
                                    style={{ minHeight: 120, textAlignVertical: "top" }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default Journal;
