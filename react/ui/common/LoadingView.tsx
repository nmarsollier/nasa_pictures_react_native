import { ActivityIndicator, View } from 'react-native';
import { ColorSchema } from '../styles/ColorSchema';

export default function LoadingView() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.blueBackground,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
