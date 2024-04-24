import { useEffect, useState } from 'react'
import { ImageValue } from '../api/ImageValue'
import { fetchImages } from '../api/ImagesRepository'
import { getDBImageList, storeDBImageList, storeDBImageMetadata } from '../api/ImagesStorage'

export interface ImagesListState {
    date: string,
    isError: boolean,
    isLoading: boolean,
    images: ImageValue[],
    loadedCount: number,
    isFullyLoaded: boolean,
}

export function useImagesListState(date: string) {
    const [state, setState] = useState<ImagesListState>(
        {
            date: "",
            isError: false,
            isLoading: true,
            images: [],
            loadedCount: 0,
            isFullyLoaded: false,
        }
    )

    const incrementLoadedCount = () => {
        setState((s) => {
            const newCount = Math.min(s.loadedCount + 1, s.images.length)

            storeDBImageMetadata(
                s.date,
                {
                    imagesCount: s.images.length,
                    imagesLoaded: newCount,
                }
            )

            return {
                ...s,
                loadedCount: newCount,
                isFullyLoaded: (newCount >= s.images.length)
            }
        })
    }

    const loadImages = async (date: string) => {
        setState(
            {
                date: date,
                isError: false,
                isLoading: true,
                images: [],
                loadedCount: 0,
                isFullyLoaded: false,
            }
        )

        const imagesFromDB = await getDBImageList(date)
        if (imagesFromDB) {
            setState(
                {
                    date: date,
                    isError: false,
                    isLoading: false,
                    images: imagesFromDB,
                    loadedCount: 0,
                    isFullyLoaded: false
                }
            )
            return
        }

        try {
            const images = await fetchImages(date)
            if (images) {
                storeDBImageList(date, images)

                setState(
                    {
                        date: date,
                        isError: false,
                        isLoading: false,
                        images: images,
                        loadedCount: 0,
                        isFullyLoaded: false,
                    }
                )
            } else {
                setState(
                    {
                        date: date,
                        isError: true,
                        isLoading: false,
                        images: [],
                        loadedCount: 0,
                        isFullyLoaded: false,
                    }
                )
            }
        } catch (error) {
            setState(
                {
                    date: date,
                    isError: true,
                    isLoading: false,
                    images: [],
                    loadedCount: 0,
                    isFullyLoaded: false,
                }
            )
        }
    }

    useEffect(() => {
        loadImages(date)
    }, [date])

    return { state, incrementLoadedCount }
}
