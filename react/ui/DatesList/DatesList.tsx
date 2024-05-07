import { useFocusEffect } from '@react-navigation/native';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DateValue, dayName } from '../../api/DateValue';
import { ImageMetadata, getDBImageMetadata } from '../../api/ImagesStorage';
import ErrorView from '../common/ErrorView';
import GradientToolbar from '../common/GradientToolbar';
import { Card, ColumnLayout, RowLayout } from '../common/Layouts';
import LoadingView from '../common/LoadingView';
import { DatesListProps } from '../common/Navigation';
import { ColorSchema } from '../styles/ColorSchema';
import { ImageAssets } from '../styles/ImageAsets';
import { DatesListState, loadDates } from './DatesListState';

const datesListSelect = createSelector<any, DatesListState>(
  (state: any) => state.datesListReducer,
  (datesListReducer) => {
    return { ...datesListReducer };
  },
);

export default function DatesList(props: DatesListProps) {
  const dispatch = useDispatch<Dispatch<any>>();

  const datesState = useSelector(datesListSelect);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadDates());
    }, []),
  );

  if (!datesState || datesState.isLoading) {
    return LoadingView();
  }

  if (datesState.isError) {
    return ErrorView({ text: 'Error Loading Dates' });
  }

  return ReadyState(props, datesState);
}

function ReadyState({ navigation }: DatesListProps, datesState: DatesListState) {
  const openDate = (date: string) => {
    navigation.navigate('ImagesList', { date });
  };

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.blueBackground,
      }}
    >
      <GradientToolbar navigation={navigation}>
        <Text
          style={{
            color: ColorSchema.textWhite,
            fontSize: 24,
          }}
        >
          Daily Images
        </Text>
      </GradientToolbar>

      <FlatList
        style={{
          paddingStart: 16,
          paddingEnd: 16,
        }}
        data={datesState.dates}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDate(item.date)}>
            <DateRow date={item} />
          </TouchableOpacity>
        )}
        windowSize={10}
        keyExtractor={(item) => item.date}
      />
    </ColumnLayout>
  );
}

function NextButton(props: { loaded?: number; count?: number }) {
  const loaded = props.loaded || 0;
  const count = props.count || 0;

  if (loaded === 0 && count === 0) {
    return (
      <RowLayout
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'center',
          paddingTop: 5,
          paddingBottom: 5,
          paddingStart: 5,
        }}
      >
        <Image style={{ height: 18, width: 18, marginEnd: 5 }} source={ImageAssets.reload} />
        <Text style={{ color: ColorSchema.textColorYellow }}>Start downloading</Text>
        <Image style={{ height: 18, width: 18, marginStart: 5 }} source={ImageAssets.next} />
      </RowLayout>
    );
  }

  if (loaded < count) {
    return (
      <RowLayout
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'center',
          paddingTop: 5,
          paddingBottom: 5,
          paddingStart: 5,
        }}
      >
        <Image style={{ height: 18, width: 18, marginEnd: 5 }} source={ImageAssets.reload} />
        <Text style={{ color: ColorSchema.textColorYellow }}>
          {loaded} / {count}
        </Text>
        <Image style={{ height: 18, width: 18, marginStart: 5 }} source={ImageAssets.next} />
      </RowLayout>
    );
  }

  return (
    <RowLayout
      style={{
        justifyContent: 'flex-end',
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 5,
      }}
    >
      <Image style={{ height: 18, width: 18, marginEnd: 5 }} source={ImageAssets.check} />
      <Text style={{ color: ColorSchema.textColorGreen }}>
        {loaded} / {count}
      </Text>
      <Image style={{ height: 18, width: 18, marginStart: 5 }} source={ImageAssets.next} />
    </RowLayout>
  );
}

const DateRow = React.memo(
  (props: { date: DateValue }) => {
    const [loaded, setLoaded] = useState(false);
    const [imagesMetadata, setImagesMetadata] = useState<ImageMetadata>({
      imagesCount: 0,
      imagesLoaded: 0,
    });

    const loadMetadata = async () => {
      const cacheInfo = await getDBImageMetadata(props.date.date);
      setLoaded(true);
      if (cacheInfo !== undefined) {
        setImagesMetadata(cacheInfo);
      }
    };

    useFocusEffect(
      useCallback(() => {
        if (!loaded) {
          loadMetadata();
        }
      }, [props.date.date]),
    );

    return (
      <Card
        style={{
          marginTop: 10,
        }}
      >
        <RowLayout style={{ width: '100%', padding: 16, alignItems: 'stretch' }}>
          <ColumnLayout>
            <Text style={{ color: ColorSchema.textWhite, fontSize: 18 }}>
              {dayName(props.date.date)}
            </Text>
            <Text style={{ color: ColorSchema.textWhite, fontSize: 14 }}>{props.date.date}</Text>
          </ColumnLayout>
          <NextButton loaded={imagesMetadata.imagesLoaded} count={imagesMetadata.imagesCount} />
        </RowLayout>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.date === nextProps.date;
  },
);
