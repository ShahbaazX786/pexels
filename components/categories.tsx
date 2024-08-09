import { constants } from '@/constants/data';
import { categoryPropsType } from '@/constants/types';
import { wp } from '@/helpers/common';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryItem from './categoryItem';

const Categories = ({ activeCategory, changeActiveCategory }: categoryPropsType) => {
    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatlistContainer}
            showsHorizontalScrollIndicator={false}
            data={constants.categories}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem title={item} index={index} isActive={activeCategory === item} changeActiveCategory={changeActiveCategory} />
            )}
        />
    )
}


const styles = StyleSheet.create({
    flatlistContainer: {
        paddingHorizontal: wp(4),
        gap: 8
    },
})

export default Categories;