import { theme } from '@/constants/theme';
import { getImageOrientation, wp } from '@/helpers/common';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

const ImageCard = ({ item, index, columns }: any) => {
    const isLastImage = () => {
        return (index + 1) % columns === 0;
    }
    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        const imageOrientation = getImageOrientation(height, width);
        return { height: imageOrientation };
    }
    return (
        <Pressable key={index} style={[styles.container, isLastImage() && styles.spacing]}>
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
        marginBottom: wp(2),
        shadowColor: theme.colors.black,
    },
    spacing: {
        marginRight: wp(2),
    },
    image: {
        height: 300,
        width: '100%',
    }
})