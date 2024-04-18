import { Text, View } from "react-native";

export default function ErrorView(props: { text: string }) {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>{props.text}</Text>
        </View>
    )
}
