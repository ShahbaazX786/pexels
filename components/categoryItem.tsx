import { theme } from '@/constants/theme'
import { hp } from '@/helpers/common'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const CategoryItem = ({ title, index, isActive, changeActiveCategory }: any) => {
    let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
    let backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white;

    const updateCategorySelection = () => {
        changeActiveCategory(isActive ? '' : title);
    }

    return (
        <View key={index}>
            <Pressable style={[styles.category, { backgroundColor }]} onPress={() => updateCategorySelection()}>
                <Text style={[styles.title, { color }]}>{title}</Text>
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
    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium as any,
        textTransform: 'capitalize'
    }
})