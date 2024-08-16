import { theme } from '@/constants/theme';
import { paramsType, SelectedFiltersPropsType } from '@/constants/types';
import { hp, wp } from '@/helpers/common';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SelectedFilters = ({ filters, setFilters, activeCategory, searchQuery, setImages, fetchImages }: SelectedFiltersPropsType) => {

    const clearSpecificFilter = (key: string) => {
        let currentFilters = { ...filters };
        delete currentFilters[key];
        setFilters({ ...currentFilters });
        setImages([]);
        let params: paramsType = {
            page: 1,
            ...currentFilters
        }
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.q = searchQuery;
        fetchImages(params, false);
    }

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                {Object.keys(filters).map((key, index) => {
                    return (
                        <View key={key} style={styles.filterItem}>

                            {
                                key === 'colors' ?
                                    (
                                        <View style={{ width: 30, height: 20, borderRadius: 7, backgroundColor: filters[key] }}></View>
                                    ) :
                                    <Text style={styles.filterItemText}>{filters[key]}</Text>
                            }
                            <Pressable style={styles.filterCloseBtn} onPress={() => clearSpecificFilter(key)}>
                                <Ionicons name="close" size={14} color={theme.colors.neutral(0.9)} />
                            </Pressable>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default SelectedFilters;

const styles = StyleSheet.create({
    filters: {
        paddingHorizontal: wp(4),
        gap: 10,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 10,
        paddingHorizontal: 10,
        borderRadius: theme.radius.xs,
        backgroundColor: theme.colors.grayBG,
    },
    filterItemText: {
        fontSize: hp(2),
        textTransform: 'capitalize'
    },
    filterCloseBtn: {
        backgroundColor: theme.colors.neutral(0.2),
        padding: 4,
        borderRadius: 7
    },
});