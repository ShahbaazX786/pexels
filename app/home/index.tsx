import Categories from '@/components/categories';
import FilterModal from '@/components/Filters/filterModal';
import ImageMasonry from '@/components/imageMasonry';
import SelectedFilters from '@/components/selectedFilters';
import { theme } from '@/constants/theme';
import { nullishString, paramsType } from '@/constants/types';
import { fetchData } from '@/helpers/api';
import { hp, wp } from '@/helpers/common';
import useDebounce from '@/helpers/hooks';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const router = useRouter();
    const [page, setPage] = useState(2);
    const modalRef = useRef(null);
    const scrollRef = useRef(null);
    const searchInputRef = useRef(null);
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState(null);
    const [isBottomReached, setIsBottomReached] = useState(false);
    const [searchQuery, setSearchQuery] = useState<nullishString>('');
    const [activeCategory, setActiveCategory] = useState<nullishString>('');

    // API calls on page load or via method call.
    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async (params = { page: 1 }, append = true) => {
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
            category: '',
            ...filters as any
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
            setPage(1);
            setImages([]);
            setActiveCategory(null);
            fetchImages({ page, q: text, ...filters as any }, false);
        }

        if (text === "") {
            searchInputRef?.current?.clear();
            setPage(1);
            setImages([]);
            fetchImages({ page, ...filters as any }, false);
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

    const applyFilters = () => {
        if (filters) {
            setPage(1);
            let params: paramsType = { page, ...filters as {} }
            setImages([]);
            if (activeCategory) params.category = activeCategory;
            if (searchQuery) params.q = searchQuery;
            fetchImages(params, false);
        }
        closeFilterModal();
    }

    const resetFilters = () => {
        if (filters) {
            setPage(1);
            setFilters(null);
            setImages([]);
            let params: paramsType = { page }
            if (activeCategory) params.category = activeCategory;
            if (searchQuery) params.q = searchQuery;
        }
        setFilters(null);
    }

    const handleScrollUp = () => {
        scrollRef?.current?.scrollTo({
            y: 0,
            animated: true
        })
    }

    const handleScroll = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const bottomPosition = contentHeight - scrollViewHeight;
        if (scrollOffset >= bottomPosition - 1) {
            if (!isBottomReached) {
                setIsBottomReached(true);
                setPage(prevPage => prevPage + 1);
                let params: paramsType = { page, ...filters as any };
                if (activeCategory) params.category = activeCategory;
                if (searchQuery) params.q = searchQuery;
                fetchImages(params);
            }
        } else if (isBottomReached) {
            setIsBottomReached(false);
        }
    }

    return (
        <View style={[styles.container, { paddingTop }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleScrollUp}>
                    <Text style={styles.title}>Pexels</Text>
                </Pressable>
                <Pressable onPress={openFilterModal}>
                    <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} style={styles.title} />
                </Pressable>
            </View>

            {/* Search Bar */}
            <ScrollView contentContainerStyle={{ gap: 15 }} onScroll={handleScroll} scrollEventThrottle={5} ref={scrollRef}>
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput placeholder='Search for Wallpapers...' style={styles.searchInput} onChangeText={handleSearchDebounce} ref={searchInputRef} />
                    {searchQuery && (<Pressable style={styles.closeIcon} onPress={clearSearch}>
                        <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
                    </Pressable>)}
                </View>

                {/* Categories */}
                <View>
                    <Categories activeCategory={activeCategory} changeActiveCategory={changeActiveCategory} />
                </View>

                {/* Applied filters */}
                {
                    filters && (<SelectedFilters filters={filters} setFilters={setFilters} setImages={setImages} searchQuery={searchQuery} activeCategory={activeCategory} fetchImages={fetchImages} />)
                }

                {/* Images Masonry */}
                <View>
                    {images.length > 0 && <ImageMasonry data={images} router={router} />}
                </View>


                {/* Filters Modal / Dialog box*/}
                <View>
                    <FilterModal modalRef={modalRef} filters={filters} setFilters={setFilters} onClose={closeFilterModal} onApply={applyFilters} onReset={resetFilters} />
                </View>

                {/* Loading Animation */}
                <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
                    <ActivityIndicator size={'large'} />
                </View>

            </ScrollView >
        </View >
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
