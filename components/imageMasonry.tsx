import { imageMasonryPropsType } from '@/constants/types'
import { getColumnCount, wp } from '@/helpers/common'
import { MasonryFlashList } from '@shopify/flash-list'
import { StyleSheet, View } from 'react-native'
import ImageCard from './imageCard'

const ImageMasonry = ({ data }: imageMasonryPropsType) => {
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