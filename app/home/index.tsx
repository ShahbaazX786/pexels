import Categories from '@/components/categories';
import FilterModal from '@/components/filterModal';
import ImageMasonry from '@/components/imageMasonry';
import SearchBar from '@/components/searchBar';
import { theme } from '@/constants/theme';
import { nullishString } from '@/constants/types';
import { fetchData } from '@/helpers/api';
import { hp, wp } from '@/helpers/common';
import useDebounce from '@/helpers/hooks';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
    let page = 1;
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [searchQuery, setSearchQuery] = useState<nullishString>('');
    const [activeCategory, setActiveCategory] = useState<nullishString>('');
    const searchInputRef = useRef(null);
    const modalRef = useRef(null);
    const [images, setImages] = useState([]);

    // API calls on page load or via method call.
    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async (params = { page: 1 }, append = false) => {
        console.log('params', params, page);
        let res = await fetchData(params);
        if (res.success && res?.data) {
            if (append) {
                setImages([...images, ...res.data] as any);
            } else {
                setImages([...res.data] as any);
            }
        }
    }

    // category changing method.
    const changeActiveCategory = (category: string) => {
        let params = {
            page: 1,
            category: ''
        }
        setActiveCategory(category);
        clearSearch();
        if (category) {
            params.category = category;
        }
        fetchImages(params, false);
    }

    // Search methods
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.length > 2) {
            page = 1;
            setImages([]);
            setActiveCategory(null);
            fetchImages({ page, q: text }, false);
        }

        if (text === "") {
            searchInputRef?.current?.clear();
            page = 1;
            setImages([]);
            fetchImages({ page }, false);
        }
    }

    const clearSearch = () => {
        setSearchQuery("");
        searchInputRef?.current?.clear();
        setImages([]);
    }

    const handleSearchDebounce = useCallback(useDebounce(handleSearch, 500), []);

    // Filter Modal Methods

    const openFilterModal = () => {
        modalRef?.current?.present();
    }

    const closeFilterModal = () => {
        modalRef?.current?.close();
    }

    return (
        <View style={[styles.container, { paddingTop }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>Pexels</Text>
                </Pressable>
                <Pressable onPress={openFilterModal}>
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} style={styles.title} />
                </Pressable>
            </View>

            {/* Search Bar */}
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <SearchBar />

                {/* Categories */}
                <View>
                    <Categories activeCategory={activeCategory} changeActiveCategory={changeActiveCategory} />
                </View>

                {/* Images Masonry */}
                <View>
                    {images.length > 0 && <ImageMasonry data={images} />}
                </View>


                {/* Filters Modal / Dialog box*/}
                <View>
                    <FilterModal modalRef={modalRef} />
                </View>

            </ScrollView>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold as any,
        color: theme.colors.neutral(0.9)
    },
})