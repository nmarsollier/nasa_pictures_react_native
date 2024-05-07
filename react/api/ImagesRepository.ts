import { getAxiosClient } from '../config/AxiosConfig';
import { day, month, year } from './DateValue';
import { ImageValue } from './ImageValue';

const currentImages = new Map<string, ImageValue[]>();

export function imageUrl(image: ImageValue) {
  return `https://epic.gsfc.nasa.gov/archive/enhanced/${year(image.date)}/${month(
    image.date,
  )}/${day(image.date)}/png/${image.image}.png`;
}

export async function fetchImages(date: string) {
  if (currentImages.get(date) === undefined) {
    const data = (await getAxiosClient().get(`/api/enhanced/date/${date}`)).data as ImageValue[];
    currentImages.set(date, data);
  }
  return currentImages.get(date);
}
