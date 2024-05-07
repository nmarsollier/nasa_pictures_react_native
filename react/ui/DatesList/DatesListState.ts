import { PayloadAction, ThunkDispatch, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchDates } from '../../api/DatesRepository'
import { getDBDates, storeDBDates } from '../../api/DatesStorage'
import { DateValue } from '../../api/DateValue'

export interface DatesListState {
  isError: boolean,
  isLoading: boolean,
  dates: DateValue[],
}

const datesListSlice = createSlice({
  name: 'datesList',
  initialState: {
    isError: false,
    isLoading: true,
    dates: [],
  } satisfies DatesListState as DatesListState,

  reducers: {
    update: (state, action: PayloadAction<DatesListState>) => {
      state.isError = action.payload.isError
      state.isLoading = action.payload.isLoading
      state.dates = action.payload.dates
    }
  }
})

export const loadDates = () => {
  return async (dispatch: (action: PayloadAction<DatesListState>) => void, getState: () => void) => {
    const dbDates = await getDBDates()

    // Load data from cache and returns the data if available
    dispatch(datesListSlice.actions.update({
      isError: false,
      isLoading: (dbDates == undefined),
      dates: (dbDates || []),
    }))

    try {
      const dates = await fetchDates()
      if (dates) {
        storeDBDates(dates)

        dispatch(datesListSlice.actions.update({
          isError: false,
          isLoading: false,
          dates: dates,
        }))
      } else {
        if (!dbDates) {
          dispatch(datesListSlice.actions.update({
            isError: true,
            isLoading: false,
            dates: []
          }))
        }
      }
    } catch (error) {
      if (!dbDates) {
        dispatch(datesListSlice.actions.update({
          isError: true,
          isLoading: false,
          dates: [],
        }))
      }
    }
  }
}

export const datesListReducer = datesListSlice.reducer
