import { Feather } from "@expo/vector-icons";
import { Image, Pressable, TouchableWithoutFeedback, View } from "react-native";

interface ModalBannerProps {
  closeModal: () => void;
  imageUrl?: string;
}

export function ModalBanner({ closeModal, imageUrl }: ModalBannerProps) {
  return (
    <View className="flex-1 justify-center items-center bg-black/70">
      <Pressable
        className="bg-white rounded-full p-2 items-center justify-center absolute top-24 left-5 z-50"
        onPress={closeModal}
      >
        <Feather size={24} color="#000" name="x-circle" />
      </Pressable>

      <TouchableWithoutFeedback>
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="contain" />
      </TouchableWithoutFeedback>
    </View>
  );
}
