import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, View } from 'react-native'
import { wp, hp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image source={require('../assets/images/welcome.png')} style={styles.bgImage} resizeMode="cover" />
            <Animated.View entering={FadeInDown.duration(800)} style={styles.container}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute',
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute',
    }
})