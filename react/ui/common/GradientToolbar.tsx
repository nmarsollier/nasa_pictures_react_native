import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ColorSchema } from "../styles/ColorSchema";
import { ImageAssets } from "../styles/ImageAsets";
import { RowLayout } from "./Layouts";

export default function GradientToolbar(props: PropsWithChildren<{
    navigation: NativeStackNavigationProp<any>
}>) {
    return (
        <LinearGradient
            colors={[ColorSchema.lightBlueBackground, ColorSchema.blueBackground]}
            style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                height: 50,
            }}
        >
            <RowLayout style={{
                paddingStart: 16,
                paddingBottom: 5,
                alignItems: "flex-end"
            }}>
                {(props.navigation.canGoBack() &&
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Image style={{ height: 24, width: 24, marginEnd: 10, marginBottom: 1 }} source={ImageAssets.back} />
                    </TouchableOpacity>
                )}
                {props.children}
            </RowLayout>
        </LinearGradient>
    )
}
