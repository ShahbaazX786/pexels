import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import { StyleSheet, Text, View } from 'react-native';

const FilterSection = ({ title, content }: any) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitleText}>{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
}

export default FilterSection;

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8
    },
    sectionTitleText: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium as '500',
        color: theme.colors.neutral(0.8),
        textTransform: 'capitalize',
    }
});