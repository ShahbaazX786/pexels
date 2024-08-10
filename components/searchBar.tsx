import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({ searchQuery, clearSearch, searchInputRef, handleSearchDebounce }: any) => {

    return (
        <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
                <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
            </View>
            <TextInput placeholder='Search for Wallpapers...' style={styles.searchInput} onChangeText={handleSearchDebounce} ref={searchInputRef} />
            {searchQuery && (<Pressable style={styles.closeIcon} onPress={clearSearch}>
                <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
            </Pressable>)}
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        backgroundColor: theme.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg,
    },
    searchIcon: {
        padding: 8
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8),
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm,
    }
})