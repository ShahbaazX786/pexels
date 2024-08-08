import { theme } from '@/constants/theme';
import { getImageOrientation, wp } from '@/helpers/common';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

const ImageCard = ({ item, index, columns }: any) => {
    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        const imageOrientation = getImageOrientation(height, width);
        return { height: imageOrientation };
    }
    return (
        <Pressable key={index} style={[styles.container]}>
            <Image
                style={[styles.image, getImageHeight()]}
                source={item?.webformatURL}
                transition={100}
            />
        </Pressable>
    )
}

export default ImageCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        overflow: 'hidden',
        marginVertical: wp(2),
        marginHorizontal: wp(2),
        shadowColor: theme.colors.black,
    },
    image: {
        height: 300,
        width: '100%',
    }
})