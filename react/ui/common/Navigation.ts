import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageValue } from '../../api/ImageValue';

export type RootStackParamList = {
  DatesList: undefined;
  ImagesList: { date: string };
  ImageDetails: { images: ImageValue[] };
};

export type DatesListProps = NativeStackScreenProps<RootStackParamList, 'DatesList'>;
export type ImagesListProps = NativeStackScreenProps<RootStackParamList, 'ImagesList'>;
export type ImageDetailsProps = NativeStackScreenProps<RootStackParamList, 'ImageDetails'>;
