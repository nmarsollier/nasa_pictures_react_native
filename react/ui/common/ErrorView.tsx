import { Text, View } from "react-native";
import { ColorSchema } from "../styles/ColorSchema";

export default function ErrorView(props: { text: string }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: ColorSchema.blueBackground,
            justifyContent: "center"
        }}>
            <Text>{props.text}</Text>
        </View>
    )
}
