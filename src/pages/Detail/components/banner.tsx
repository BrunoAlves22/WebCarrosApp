import { Dimensions, Image, View } from "react-native";

const { width: widthScreen } = Dimensions.get("window");

export function Banner({ url }: { url: string }) {
  return (
    <Image
      source={{ uri: url }}
      style={{ width: widthScreen / 1.2 }}
      resizeMode="cover"
      className="min-h-80 mx-2 rounded-lg mt-2"
    />
  );
}

export function BannerLoading() {
  return (
    <View style={{ width: widthScreen - 16 }} className="h-80 mx-2 rounded-lg mt-2 bg-gray-300" />
  );
}
