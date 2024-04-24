import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { DateValue } from '../api/DateValue'
import { fetchDates } from '../api/DatesRepository'
import { getDBDates, storeDBDates } from '../api/DatesStorage'

export interface DatesListState {
    isError: boolean,
    isLoading: boolean,
    dates: DateValue[],
}

export function useDatesListState() {
    const [state, setState] = useState<DatesListState>(
        {
            isError: false,
            isLoading: true,
            dates: [],
        }
    )

    const loadDates = async () => {
        setState(
            {
                isError: false,
                isLoading: true,
                dates: [],
            }
        )

        const dbDates = await getDBDates()
        setState(
            {
                isError: false,
                isLoading: (dbDates == undefined),
                dates: (dbDates || []),
            }
        )

        try {
            const dates = await fetchDates()
            if (dates) {
                storeDBDates(dates)

                setState(
                    {
                        isError: false,
                        isLoading: false,
                        dates: dates,
                    }
                )
            } else {
                if (!dbDates) {
                    setState(
                        {
                            isError: true,
                            isLoading: false,
                            dates: [],
                        }
                    )
                }
            }
        } catch (error) {
            if (!dbDates) {
                setState(
                    {
                        isError: true,
                        isLoading: false,
                        dates: [],
                    }
                )
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadDates()
        }, [])
    )

    return state
}
