import React, { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ColorSchema } from '../styles/ColorSchema';

export function Card(
  props: PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
  }>,
) {
  return (
    <View
      style={[
        {
          backgroundColor: ColorSchema.blueCardBackground,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

export function ColumnLayout(
  props: PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
  }>,
) {
  return (
    <View
      style={[
        props.style,
        {
          flex: 1,
          flexDirection: 'column',
        },
      ]}
    >
      {props.children}
    </View>
  );
}

export function RowLayout(
  props: PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
  }>,
) {
  return (
    <View
      style={[
        props.style,
        {
          flex: 1,
          flexDirection: 'row',
        },
      ]}
    >
      {props.children}
    </View>
  );
}
