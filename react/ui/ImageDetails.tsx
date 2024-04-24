import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { imageUrl } from '../api/ImagesRepository';
import { ImageDetailsProps } from './common/Navigation';
import { ColorSchema } from './styles/ColorSchema';
import { buildImageUrl } from '../models/ImageCache';

export function ImageDetails(props: ImageDetailsProps) {
  const images = props.route.params.images.map((i) => {
    return buildImageUrl(imageUrl(i), i.identifier);
  });

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageIndex((imageIndex + 1) % images.length);
    }, 50);
    return () => clearTimeout(timer);
  }, [imageIndex]);

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: ColorSchema.blackBackground }}
    >
      <Animated.Image style={{ width: 360, height: 360 }} source={{ uri: images[imageIndex] }} />
    </View>
  );
}
