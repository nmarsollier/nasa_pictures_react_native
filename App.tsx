import React from 'react';

import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { setupAxios } from './react/config/AxiosConfig';
import { datesListReducer } from './react/models/DatesListModel';
import { imagesListReducer } from './react/models/ImagesListModel';
import DatesList from './react/ui/DatesList';
import { ImageDetails } from './react/ui/ImageDetails';
import ImageList from './react/ui/ImagesList';
import { RootStackParamList } from './react/ui/common/Navigation';
import { ColorSchema } from './react/ui/styles/ColorSchema';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const sotore = configureStore({
  reducer: combineReducers({ datesListReducer, imagesListReducer: imagesListReducer })
})

export default function App() {
  setupAxios()

  return (
    <Provider store={sotore} >

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={ColorSchema.lightBlueBackground}
        />

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="DatesList"
              component={DatesList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ImagesList"
              component={ImageList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ImageDetails"
              component={ImageDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
