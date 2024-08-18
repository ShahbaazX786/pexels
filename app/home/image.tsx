import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { Entypo, Octicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const ImageScreen = () => {
    const router = useRouter();
    const item = useLocalSearchParams();
    const [status, setStatus] = useState('loading');
    let uri: string = Array.isArray(item?.largeImageURL) ? item.largeImageURL[0] : item.largeImageURL; // Ensure it's a string
    const fileName = item.previewURL?.split('/').pop();
    const imageURL = uri;
    const filePath = `${FileSystem.documentDirectory}${fileName}`;


    const getImageDimensions = () => {
        const aspectRatio: number = ((item?.imageWidth) / (item?.imageHeight)) as number;
        const maxWidth = Platform.OS == 'web' ? wp(50) : wp(90);
        let calculatedHeight = maxWidth / aspectRatio;
        let calculatedWidth = maxWidth;

        if (aspectRatio < 1) {
            calculatedWidth = calculatedHeight * aspectRatio;
        }

        return {
            width: calculatedWidth,
            height: calculatedHeight
        }
    }


    const handleOnLoad = () => {
        setStatus('loaded');
    }

    const shareImage = async () => {
        if (Platform.OS === 'web') {
            showToast('Link Copied', 'success');
        } else {
            setStatus('sharing');
            const res = await downloadFile();
            if (res) {
                await Sharing.shareAsync(res);
                setStatus('');
            }
        }
    }

    const downloadImage = async () => {
        if (Platform.OS === 'web') {
            const anchor = document.createElement('a');
            anchor.href = imageURL;
            anchor.target = "_blank";
            anchor.download = fileName || 'download';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        } else {
            setStatus('downloading');
            const res = await downloadFile();
            if (res) {
                console.log('Image saved successfully at', res);
                showToast('Image saved successfully', 'success');
            }
        }

    }

    const downloadFile = async () => {
        try {
            const { uri } = await FileSystem.downloadAsync(imageURL, filePath);
            setStatus('');
            return uri;
        } catch (error) {
            setStatus('');
            showToast('Unable to save the Image', 'error');
            console.log('error occuered while saving the file', error);
        }
    }

    const closeDialog = () => {
        router.back();

    }

    const showToast = (message: string, type: string) => {
        Toast.show({
            text1: message,
            type,
            position: 'bottom',
        })
    }

    const toastConfig = {
        success: ({ text1, props, ...rest }: any) =>
        (
            <View style={styles.toast}>
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        ),
        error: ({ text1, props, ...rest }: any) => (
            <View style={styles.toast}>
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        )
    }

    return (
        <BlurView tint='dark' intensity={90} style={styles.container}>
            <View style={[getImageDimensions()]}>
                <View style={styles.loading}>
                    {status === 'loading' && <ActivityIndicator size={'large'} color={'white'} />}
                </View>
                <Image transition={100} style={[styles.image, getImageDimensions()]} source={{ uri }} onLoad={handleOnLoad} />
            </View>
            <View style={styles.btnWrapper}>
                <Animated.View entering={FadeInDown.springify()}>
                    <Pressable style={styles.btn} onPress={closeDialog}>
                        <Octicons name="x" size={28} color={'white'} />
                    </Pressable>
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(100)}>
                    {status === 'downloading' ? (
                        <View style={styles.btn}>
                            <ActivityIndicator size={'large'} color={'white'} />
                        </View>
                    ) : (
                        <Pressable style={styles.btn} onPress={downloadImage}>
                            <Octicons name='download' size={28} color={'white'} />
                        </Pressable>
                    )}
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(200)}>
                    {status === 'sharing' ? (
                        <View style={styles.btn}>
                            <ActivityIndicator size={'large'} color={'white'} />
                        </View>
                    ) : (
                        <Pressable style={styles.btn} onPress={shareImage}>
                            <Entypo name='share' size={28} color={'white'} />
                        </Pressable>
                    )}

                </Animated.View>
            </View>
            <Toast config={toastConfig} visibilityTime={2500} />
        </BlurView >
    )
}

export default ImageScreen;

const styles = StyleSheet.create(
    {

        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: wp(4),
            position: 'relative',
        },
        image: {
            borderWidth: 2,
            borderRadius: theme.radius.lg,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: 'rgba(255,255,255,0.1)',
        },
        loading: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        btnWrapper: {
            position: 'absolute',
            bottom: 20,
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 50,
        },
        btn: {
            height: hp(6),
            width: hp(7),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: theme.radius.lg,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderCurve: 'continuous',
            marginHorizontal: 10,
            paddingHorizontal: 10,
        },
        toast: {
            padding: 15,
            paddingHorizontal: 30,
            borderRadius: theme.radius.xl,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
        },
        toastText: {
            fontSize: hp(1.8),
            fontWeight: theme.fontWeights.semibold as '600',
            color: theme.colors.white,
        }
    }
)