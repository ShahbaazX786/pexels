import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './imageCard'
import { getColumnCount, wp } from '@/helpers/common'

const ImageMasonry = ({ data }: any) => {
    const columns = getColumnCount();
    return (
        <View style={styles.container}>
            <MasonryFlashList
                data={data}
                numColumns={columns}
                contentContainerStyle={styles.listContainerStyle}
                renderItem={({ item, index }) => <ImageCard item={item} columns={columns} index={index} />}
                estimatedItemSize={200}
            />
        </View>
    )
}

export default ImageMasonry

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        width: wp(100),
    },
    listContainerStyle: {
        paddingHorizontal: wp(4),
    }
})