import { Audio } from 'expo-av';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Relax = () => {
    const [totalSeconds, setTotalSeconds] = useState(180);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [breatheText, setBreatheText] = useState("Press Start");

    const [showPicker, setShowPicker] = useState(false);

    const progress = useRef(new Animated.Value(0)).current;
    const pulse = useRef(new Animated.Value(0)).current;

    const progressAnimRef = useRef<any>(null);
    const pulseAnimRef = useRef<any>(null);
    const timerRef = useRef<any>(null);

    const soundRef = useRef<Audio.Sound | null>(null);

    const radius = 120;
    const strokeWidth = 6;
    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;

    const DURATION_OPTIONS = [
        { secs: 180, label: "3 minutes" },
        { secs: 360, label: "6 minutes" },
        { secs: 540, label: "9 minutes" },
        { secs: 720, label: "12 minutes" },
    ];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(totalSeconds);
        }
    }, [totalSeconds]);

    useEffect(() => {
        if (!isActive) return;
        const elapsed = totalSeconds - timeLeft;
        const cyclePos = elapsed % 12;
        if (cyclePos < 4) {
            setBreatheText("Breathe In");
        } else if (cyclePos < 8) {
            setBreatheText("Hold");
        } else {
            setBreatheText("Breathe Out");
        }
    }, [timeLeft, isActive, totalSeconds]);

    useEffect(() => {
        return () => {
            stopAll();
            if (soundRef.current) {
                soundRef.current.unloadAsync().catch(() => {});
                soundRef.current = null;
            }
        };
    }, []);

    const playSound = async () => {
        try {
            const asset = require('@/assets/sounds/relax_loop.mp3');
            const { sound } = await Audio.Sound.createAsync(
                asset,
                { isLooping: true, volume: 0.6, shouldPlay: true }
            );
            soundRef.current = sound;
            await sound.playAsync().catch(() => {});
        } catch (e) {
        }
    };

    const stopSound = async () => {
        try {
            if (soundRef.current) {
                await soundRef.current.stopAsync().catch(() => {});
                await soundRef.current.unloadAsync().catch(() => {});
                soundRef.current = null;
            }
        } catch {}
    };

    const stopAll = () => {
        try {
            progressAnimRef.current?.stop?.();
        } catch {}
        try {
            pulseAnimRef.current?.stop?.();
        } catch {}
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        stopSound().catch(() => {});
    };

    const startPulseAnimation = () => {
        pulse.setValue(0);
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0.9,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimRef.current = loop;
        loop.start();
    };

    const startBreathing = (force = false) => {
        if (isActive && !force) return;
        stopAll();
        setIsActive(true);
        setTimeLeft(totalSeconds);
        setBreatheText("Breathe In");

        // start audio
        playSound().catch(() => {});

        progress.setValue(0);
        const progAnim = Animated.timing(progress, {
            toValue: 1,
            duration: totalSeconds * 1000,
            easing: Easing.linear,
            useNativeDriver: false
        });
        progressAnimRef.current = progAnim;
        progAnim.start(({ finished }) => {
            if (finished) {
                setIsActive(false);
                setBreatheText("Complete! Go again?");
                stopAll();
            }
        });

        startPulseAnimation();

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    stopAll();
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopAndReset = () => {
        stopAll();
        progress.setValue(0);
        pulse.setValue(0);
        progressAnimRef.current = null;
        pulseAnimRef.current = null;
        setIsActive(false);
        setTimeLeft(totalSeconds);
        setBreatheText("Press Start");
    };

    const onSelectDuration = (secs: number) => {
        stopAndReset();
        setTotalSeconds(secs);
        setShowPicker(false);
    };

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    const scale = pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.15],
    });

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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Relaxation</Text>
                                <Text className="text-sm text-gray-600 mt-1">Take a moment to breathe and relax</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-1 items-center justify-center">
                {/* More visible, tappable timer indicator with hint */}
                <Pressable
                    onPress={() => setShowPicker(true)}
                    style={{
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Change duration"
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#EFF8FF',
                            borderColor: '#CDE7FF',
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            borderRadius: 22,
                            shadowColor: '#000',
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            elevation: 2,
                        }}
                    >
                        <Text style={{ fontSize: 18, marginRight: 10 }}>⏱️</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#0B66A1' }}>
                            {formatTime(timeLeft)}
                        </Text>
                    </View>
                    <Text style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>
                        Tap to change duration
                    </Text>
                </Pressable>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 50 }}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            borderRadius: 130,
                            borderWidth: 6,
                            borderColor: '#E6F0FA',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ scale }],
                        }}
                    >
                        <Text style={{ color: '#334155', fontSize: 18, fontWeight: '600' }}>
                            {breatheText}
                        </Text>
                    </Animated.View>
                    <Svg width={diameter + strokeWidth * 4} height={diameter + strokeWidth * 4}>
                        <Circle
                            cx={(diameter + strokeWidth * 4) / 2}
                            cy={(diameter + strokeWidth * 4) / 2}
                            r={radius}
                            stroke="#E0E7EF"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <AnimatedCircle
                            cx={(diameter + strokeWidth * 4) / 2}
                            cy={(diameter + strokeWidth * 4) / 2}
                            r={radius}
                            stroke="#0077CC"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                            rotation="-90"
                            originX={(diameter + strokeWidth * 4) / 2}
                            originY={(diameter + strokeWidth * 4) / 2}
                        />
                    </Svg>
                </View>

                <TouchableOpacity
                    onPress={() => { if (isActive) stopAndReset(); else startBreathing(); }}
                    className={`px-8 py-4 rounded-full ${isActive ? 'bg-red-500' : 'bg-[#0077CC]'}`}
                >
                    <Text className="text-white font-bold text-lg">
                        {isActive ? 'Stop' : 'Start'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Duration picker modal */}
            <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
                <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPicker(false)}>
                    <Pressable style={{ width: 280, backgroundColor: 'white', borderRadius: 12, padding: 12 }} onPress={() => {}}>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Choose duration</Text>
                        {DURATION_OPTIONS.map(opt => (
                            <TouchableOpacity key={opt.secs} onPress={() => onSelectDuration(opt.secs)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                <Text style={{ fontSize: 16 }}>{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setShowPicker(false)} style={{ marginTop: 10, paddingVertical: 10, alignItems: 'center' }}>
                            <Text style={{ color: '#0077CC', fontWeight: '600' }}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default Relax;
