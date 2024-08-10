import { theme } from '@/constants/theme'
import { FilterRowPropsType } from '@/constants/types'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const FilterRowColorSection = ({ data, filterName, filters, setFilters }: FilterRowPropsType) => {

    const onSelect = (item: any) => {
        setFilters({ ...filters, [filterName]: item });
        console.log(filters);
    }
    return (
        <View style={styles.rowStyles}>
            {
                data && data.map((item: any, index: number) => {
                    let isActive = filters && filters[filterName] == item;
                    let borderColor = isActive ? theme.colors.neutral(0.4) : 'white'
                    return (
                        <Pressable key={item} onPress={() => onSelect(item)}>
                            <View style={[styles.colorWrapper, { borderColor }]}>
                                <View style={[styles.color, { backgroundColor: item }]}>

                                </View>
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export default FilterRowColorSection;

const styles = StyleSheet.create({
    rowStyles: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    outlinedBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous'
    },
    outlinedBtnText: {
        textTransform: 'capitalize'
    },
    color: {
        height: 30,
        width: 40,
        borderRadius: theme.radius.sm - 3,
        borderCurve: 'continuous',
        borderWidth: 1,
    },
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm,
        borderWidth: 2,
        borderCurve: 'continuous'
    }
})