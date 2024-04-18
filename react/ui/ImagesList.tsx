import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { dayName, hourMinute } from '../api/DateValue';
import { ImageValue } from '../api/ImageValue';
import { imageUrl } from '../api/ImagesRepository';
import { ImagesListState, incrementLoadedCount, loadImages } from '../models/ImagesListModel';
import { CachedImage } from './common/CachedImage';
import ErrorView from './common/ErrorView';
import GradientToolbar from './common/GradientToolbar';
import { Card, ColumnLayout } from './common/Layouts';
import LoadingView from './common/LoadingView';
import { ImagesListProps } from './common/Navigation';
import { ColorSchema } from './styles/ColorSchema';
import { createSelector } from '@reduxjs/toolkit';

function ImageCard(props: { image: ImageValue, onLoaded: () => void }) {
    return (
        <Card style={{
            margin: 10,
            width: 140,
            height: 140,
            backgroundColor: ColorSchema.blackBackground
        }}>
            <CachedImage
                style={{ width: 130, height: 130 }}
                cacheKey={props.image.identifier}
                source={{ uri: imageUrl(props.image) }}
                onDownloadComplete={() => { props.onLoaded() }}
            />

            <Text style={{
                color: ColorSchema.textWhite,
                fontSize: 12,
                position: "absolute",
                bottom: 20,
                left: 10,
            }}>
                {props.image.identifier}
            </Text>
            <Text style={{
                color: ColorSchema.textWhite,
                fontSize: 12,
                position: "absolute",
                bottom: 8,
                left: 10,
            }}>
                Captured {hourMinute(props.image.date)} hs
            </Text>
        </Card>
    )
}

const imagesListSelect = createSelector<any, ImagesListState>(
    (state: any) => state.imagesListReducer,
    (imagesListReducer) => { return { ...imagesListReducer } }
)

export default function ImageList(props: ImagesListProps) {
    const dispatch = useDispatch<Dispatch<any>>()

    const imageState = useSelector(imagesListSelect)

    useEffect(() => {
        dispatch(loadImages(props.route.params.date))
    }, [])

    if (!imageState || imageState.isLoading) {
        return LoadingView()
    }

    if (imageState.isError) {
        return ErrorView({ text: 'Error Loading Images' })

    }

    return ReadyState(props, dispatch, imageState)
}

function ReadyState(props: ImagesListProps, dispatch: Dispatch<any>, imageState: ImagesListState) {
    const openAnimation = (images: ImageValue[]) => {
        if (imageState.isFullyLoaded) {
            props.navigation.navigate("ImageDetails", { images: images })
        }
    }

    return (
        <ColumnLayout style={{
            backgroundColor: ColorSchema.blueBackground,
        }}>
            <GradientToolbar navigation={props.navigation}>
                <Text
                    style={{
                        color: ColorSchema.textWhite,
                        fontSize: 24,
                    }}>
                    {dayName(props.route.params.date)}
                </Text>

                <Text
                    style={{
                        color: ColorSchema.textWhite,
                        fontSize: 18,
                        paddingStart: 10,
                        paddingBottom: 2,
                        alignSelf: "flex-end"
                    }}>
                    {props.route.params.date}
                </Text>
            </GradientToolbar>

            <Pressable style={{
                marginStart: 16,
                marginTop: 8,
                marginEnd: 16,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: ColorSchema.lightBlueBackground,
            }}
                onPress={() => openAnimation(imageState.images)}
            >
                <Text
                    style={{
                        color: ColorSchema.textWhite,
                        fontSize: 18,
                        paddingStart: 10,
                        paddingBottom: 2,
                    }}
                >
                    {imageState.isFullyLoaded ? "Play images" : "Downloading Images"}
                </Text>
            </Pressable>

            <FlatList
                style={{
                    paddingStart: 16,
                    paddingEnd: 16,
                    marginTop: 16,
                }}
                numColumns={2}
                data={imageState.images}
                renderItem={({ item }) =>
                    <ImageCard image={item} onLoaded={() => { dispatch(incrementLoadedCount()) }} />
                }
            />
        </ColumnLayout>
    )
}
