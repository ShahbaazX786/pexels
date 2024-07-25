import { constants } from '@/constants/data';
import { wp } from '@/helpers/common';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryItem from './categoryItem';

const Categories = () => {
    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatlistContainer}
            showsHorizontalScrollIndicator={false}
            data={constants.categories}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem title={item} index={index} />
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