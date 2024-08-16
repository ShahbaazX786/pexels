import { theme } from '@/constants/theme'
import { FilterRowPropsType } from '@/constants/types'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const FilterRow = ({ data, filterName, filters, setFilters }: FilterRowPropsType) => {

    const onSelect = (item: any) => {
        setFilters({ ...filters, [filterName]: item });
        console.log(filters);
    }
    return (
        <View style={styles.rowStyles}>
            {
                data && data.map((item: any, index: number) => {
                    let isActive = filters && filters[filterName] == item;
                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
                    let color = isActive ? 'white' : theme.colors.neutral(0.7);
                    return (
                        <Pressable key={item} style={[styles.outlinedBtn, { backgroundColor }]} onPress={() => onSelect(item)}>
                            <Text style={[styles.outlinedBtnText, { color }]}>{item}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export default FilterRow;

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
    }
})