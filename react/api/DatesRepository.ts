import { getAxiosClient } from '../config/AxiosConfig';
import { DateValue } from './DateValue';

let currentDates: DateValue[] | undefined;

export async function fetchDates(force: boolean = false) {
  if (!currentDates) {
    currentDates = (await getAxiosClient().get('/api/enhanced/all')).data as DateValue[];
  }
  return currentDates;
}
