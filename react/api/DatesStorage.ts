import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateValue } from './DateValue';

export async function storeDBDates(dates: DateValue[]) {
    try {
        const jsonValue = JSON.stringify(dates);
        await AsyncStorage.setItem('dates', jsonValue);
    } catch (e) {
        console.log(e)
    }
}

export async function getDBDates(): Promise<(DateValue[] | undefined)> {
    try {
        const jsonValue = await AsyncStorage.getItem('dates');
        return jsonValue != null ? (JSON.parse(jsonValue) as DateValue[]) : undefined;
    } catch (e) {
        console.log(e)
    }
}
