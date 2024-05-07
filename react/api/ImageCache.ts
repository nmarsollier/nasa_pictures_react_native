import * as FileSystem from 'expo-file-system';

export async function cachedImageUrl(uri: string, cacheKey: string) {
  const cacheFileUri = buildImageUrl(uri, cacheKey);
  const imgXistsInCache = await findImageInCache(cacheFileUri);
  if (imgXistsInCache.exists) {
    return cacheFileUri;
  }
  return undefined;
}

export async function cacheImage(uri: string, cacheKey: string, callback: () => void) {
  try {
    const cacheFileUri = buildImageUrl(uri, cacheKey);

    const downloadImage = FileSystem.createDownloadResumable(uri, cacheFileUri, {}, callback);

    const downloaded = await downloadImage.downloadAsync();

    return {
      cached: downloaded ? true : false,
      err: false,
      path: downloaded?.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}

export function buildImageUrl(uri: string, cacheKey: string): string {
  const imgXt = getImgExtension(uri);
  if (!imgXt || !imgXt.length) {
    return '';
  }
  return `${FileSystem.cacheDirectory}${cacheKey}.${imgXt[0]}`;
}

function getImgExtension(uri: string) {
  const basename = uri.split(/[\\/]/).pop() || '';

  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
}

async function findImageInCache(uri: string) {
  try {
    const info = await FileSystem.getInfoAsync(uri);

    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}
