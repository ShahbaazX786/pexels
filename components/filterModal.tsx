import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const FilterModal = ({ modalRef }: any) => {
    const snapPoints = useMemo(() => ['70%'], []);

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
                    <Text style={styles.filterText}>Filter Sections</Text>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}


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
            <BlurView intensity={25} style={StyleSheet.absoluteFill} tint="dark" />
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
    }
})

export default FilterModal;
