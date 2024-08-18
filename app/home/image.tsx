import { theme } from '@/constants/theme';
import { wp } from '@/helpers/common';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Platform, StyleSheet, View } from 'react-native';

const ImageScreen = () => {
    const router = useRouter();
    const item = useLocalSearchParams();
    const [status, setStatus] = useState('loading');
    let uri: string = Array.isArray(item?.webformatURL) ? item.webformatURL[0] : item.webformatURL; // Ensure it's a string


    const getImageDimensions = () => {
        const aspectRatio = item?.imageWidth / item?.imageHeight;
        const maxWidth = Platform.OS == 'web' ? wp(50) : wp(90);
        let calculatedHeight = maxWidth / aspectRatio;
        let calculatedWidth = maxWidth;

        if (aspectRatio < 1) {
            calculatedWidth = calculatedHeight * aspectRatio;
        }

        console.log(calculatedWidth, calculatedHeight, uri);

        return {
            width: calculatedWidth,
            height: calculatedHeight
        }
    }


    const handleOnLoad = () => {
        setStatus('loaded');
    }

    return (
        <BlurView tint='dark' intensity={60} style={styles.container}>
            <View style={[getImageDimensions()]}>
                <View style={styles.loading}>
                    {status === 'loading' && <ActivityIndicator size={'large'} color={'white'} />}
                </View>
                <Image transition={100} style={[styles.image, getImageDimensions()]} source={{ uri }} onLoad={handleOnLoad} />
            </View>
            <Button title='Back' onPress={() => router.back()} />
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
        },
        image: {
            borderWidth: 2,
            borderRadius: theme.radius.lg,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.1)',
        },
        loading: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }
    }
)