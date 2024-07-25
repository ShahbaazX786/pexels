import { theme } from '@/constants/theme'
import { hp } from '@/helpers/common'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const CategoryItem = ({ title, index }: any) => {
    return (
        <View key={index}>
            <Pressable style={styles.category}>
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    category: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',
        backgroundColor: theme.colors.white
    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium as any
    }
})