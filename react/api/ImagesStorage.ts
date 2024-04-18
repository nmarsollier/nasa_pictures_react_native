import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageValue } from './ImageValue';

export async function storeDBImageList(date: string, images: ImageValue[]) {
    if (images.length == 0) {
        return
    }

    try {
        const jsonValue = JSON.stringify(images);
        await AsyncStorage.setItem(date, jsonValue);
    } catch (e) {
        console.log(e)
    }
}

export async function getDBImageList(date: string): Promise<(ImageValue[] | undefined)> {
    try {
        const jsonValue = await AsyncStorage.getItem(date);
        return jsonValue != null ? (JSON.parse(jsonValue) as ImageValue[]) : undefined;
    } catch (e) {
        console.log(e)
    }
}

export interface ImageMetadata {
    imagesCount: number,
    imagesLoaded: number,
}

export async function storeDBImageMetadata(date: string, metadata: ImageMetadata) {
    try {
        const jsonValue = JSON.stringify(metadata);
        await AsyncStorage.setItem(`${date}_metadata`, jsonValue);
    } catch (e) {
        console.log(e)
    }
}

export async function getDBImageMetadata(date: string): Promise<(ImageMetadata | undefined)> {
    try {
        const jsonValue = await AsyncStorage.getItem(`${date}_metadata`);
        return jsonValue != null ? (JSON.parse(jsonValue) as ImageMetadata) : undefined;
    } catch (e) {
        console.log(e)
    }
}
