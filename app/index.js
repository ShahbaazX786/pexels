import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, View } from 'react-native'
import { wp, hp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
export default function WelcomeScreen() {
    return (
        <View>
            <StatusBar style="light" />
            <Image source={require('../assets/images/welcome.png')} style={styles.bgImage} resizeMode="cover" />
            <View style={styles.container}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }} />
            </View>
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
        position: 'absolute',
        bottom: 0,
    }
})