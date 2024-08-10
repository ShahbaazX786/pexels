import { constants } from '@/constants/data';
import { theme } from '@/constants/theme';
import { filterSectionPropsType, sectionsType } from '@/constants/types';
import { hp } from '@/helpers/common';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import FilterRow from './filterRow';
import FilterRowColorSection from './filterRowColorSection';
import FilterSection from './filterSection';

const FilterModal = ({ modalRef, onClose, onApply, onReset, filters, setFilters }: any) => {
    const sections: sectionsType = {
        "order": (props: filterSectionPropsType) => <FilterRow {...props} />,
        "orientation": (props: filterSectionPropsType) => <FilterRow {...props} />,
        "type": (props: filterSectionPropsType) => <FilterRow {...props} />,
        "colors": (props: filterSectionPropsType) => <FilterRowColorSection {...props} />,
    }
    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={CustomBackDropComponent}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    {
                        Object.keys(sections).map((name, index) => {
                            let sectionView = sections[name];
                            let sectionData = constants.filters[name];
                            return (
                                <View key={name}>
                                    <FilterSection title={name} content={sectionView({ data: sectionData, filters, setFilters, filterName: name, })} />
                                </View>
                            )
                        })
                    }

                    {/* Action Buttons */}
                    <View style={styles.actionBtns}>
                        <Pressable style={styles.resetBtn} onPress={onReset}>
                            <Text style={[styles.btnText, { color: theme.colors.neutral(0.9) }]}>Reset</Text>
                        </Pressable>
                        <Pressable style={styles.applyBtn} onPress={onApply}>
                            <Text style={[styles.btnText, { color: theme.colors.white }]}>Apply</Text>
                        </Pressable>
                    </View>

                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

// Internal component
const CustomBackDropComponent = ({ animatedIndex, style }: any) => {
    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP);
        return { opacity };
    })

    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle,
    ]

    return (
        <Animated.View style={containerStyle}>
            <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '100%',
        flex: 1,
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold as '600',
        color: theme.colors.neutral(0.8),
    },
    actionBtns: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    applyBtn: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.8),
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        borderCurve: 'continuous'
    },
    resetBtn: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.04),
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.md,
        borderCurve: 'continuous',
        borderWidth: 2,
        borderColor: theme.colors.neutral(0.1),
    },
    btnText: {
        fontSize: hp(2.2),
    }
})

export default FilterModal;
