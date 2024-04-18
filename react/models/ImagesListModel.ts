import { PayloadAction, configureStore, createSelector, createSlice } from '@reduxjs/toolkit'
import { fetchImages } from '../api/ImagesRepository'
import { getDBImageList, storeDBImageList, storeDBImageMetadata } from '../api/ImagesStorage'
import { ImageValue } from '../api/ImageValue'
import { sotore } from '../../App'

export interface ImagesListState {
    date: string,
    isError: boolean,
    isLoading: boolean,
    images: ImageValue[],
    loadedCount: number,
    isFullyLoaded: boolean,
}

const imagesListSlice = createSlice({
    name: 'imagesList',
    initialState: {
        date: "",
        isError: false,
        isLoading: true,
        images: [],
        loadedCount: 0,
        isFullyLoaded: false,
    } satisfies ImagesListState as ImagesListState,

    reducers: {
        update: (state, action: PayloadAction<ImagesListState>) => {
            state.date = action.payload.date
            state.isError = action.payload.isError
            state.isLoading = action.payload.isLoading
            state.isFullyLoaded = action.payload.isFullyLoaded
            state.images = action.payload.images
            state.loadedCount = action.payload.loadedCount
        },
        incrementLoadedCount: state => {
            const newCount = Math.min(state.loadedCount + 1, state.images.length)

            state.loadedCount = newCount
            state.isFullyLoaded = (newCount >= state.images.length)

            storeDBImageMetadata(
                state.date,
                {
                    imagesCount: state.images.length,
                    imagesLoaded: newCount,
                }
            )
        }
    }
})

export const loadImages = (date: string) => {
    return async (dispatch: (action: PayloadAction<ImagesListState>) => void, getState: () => { imagesListReducer: ImagesListState }) => {
        dispatch(imagesListSlice.actions.update({
            date: date,
            isError: false,
            isLoading: true,
            images: [],
            isFullyLoaded: false,
            loadedCount: 0,
        }))

        const imagesFromDB = await getDBImageList(date)
        if (imagesFromDB) {
            dispatch(imagesListSlice.actions.update({
                date: date,
                isError: false,
                isLoading: false,
                images: imagesFromDB,
                loadedCount: 0,
                isFullyLoaded: false,
            }))
            return
        }

        try {
            const images = await fetchImages(date)
            if (images) {
                storeDBImageList(date, images)

                dispatch(imagesListSlice.actions.update({
                    date: date,
                    isError: false,
                    isLoading: false,
                    images: images,
                    isFullyLoaded: false,
                    loadedCount: 0,
                }))
            } else {
                dispatch(imagesListSlice.actions.update({
                    date: date,
                    isError: true,
                    isLoading: false,
                    images: [],
                    isFullyLoaded: false,
                    loadedCount: 0,
                }))
            }
        } catch (error) {
            dispatch(imagesListSlice.actions.update({
                date: date,
                isError: true,
                isLoading: false,
                images: [],
                isFullyLoaded: false,
                loadedCount: 0,
            }))
        }
    }
}

export const { incrementLoadedCount } = imagesListSlice.actions

export const imagesListReducer = imagesListSlice.reducer
