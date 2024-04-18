import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, StyleProp, View } from "react-native";
import { cacheImage, cachedImageUrl as findCachedImageUrl } from "../../models/ImageCache";

export function CachedImage(props: {
    source: {
        uri: string
    },
    cacheKey: string,
    style?: StyleProp<ImageStyle> | undefined,
    onDownloadComplete?: () => void,
}) {
    const isMounted = useRef(true);
    const [imgUri, setUri] = useState("");

    async function loadImg() {
        let cacheFileUri = await findCachedImageUrl(props.source.uri, props.cacheKey);
        if (cacheFileUri) {
            setUri(cacheFileUri);
        } else {
            let cached = await cacheImage(props.source.uri, props.cacheKey, () => { });
            if (cached.cached && cached.path) {
                setUri(cached.path);
            }
        }
        if (props.onDownloadComplete) {
            props.onDownloadComplete()
        }
    }

    useEffect(() => {
        loadImg();
        return () => { isMounted.current = false };
    }, [props.source.uri]);

    return (
        <>
            {imgUri ? (
                <Image source={{ uri: imgUri }} style={props.style} />
            ) : (
                <View
                    style={[
                        { alignItems: "center", justifyContent: "center" },
                        props.style
                    ]}
                >
                    <ActivityIndicator size={33} />
                </View>
            )}
        </>
    );
};
