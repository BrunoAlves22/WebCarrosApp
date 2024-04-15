import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DimensionValue, Image, Pressable, Text, View } from "react-native";
import { StackParamList } from "../../routes";
import { CarsProps } from "../../types/cars.type";
import { currencyMask } from "../../masks/currencymask";

interface CarListProps {
  data: CarsProps;
  widthScreen: DimensionValue;
  enableDelete?: boolean;
  deleteItem?: () => Promise<void>;
}

export function CarList({ data, widthScreen, enableDelete = false, deleteItem }: CarListProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigate() {
    navigation.navigate("detail", { id: data.id });
  }

  async function handleDelete() {
    if (!deleteItem) return;
    await deleteItem();
  }

  return (
    <Pressable
      onLongPress={enableDelete ? handleDelete : () => {}}
      onPress={handleNavigate}
      style={{ width: widthScreen }}
      className="w-full bg-white p-1 rounded mb-4"
    >
      <Image
        className="w-full h-36 rounded mb-2"
        source={{ uri: data.images[0].url }}
        resizeMode="cover"
      />

      <Text className="font-bold text-base mb-1">{data.name}</Text>
      <Text className="font-500 text-sm mb-1">
        {data.year} - {data.km} km
      </Text>
      <Text className="font-bold text-base mb-1 mt-3"> {currencyMask(Number(data.price))}</Text>

      <View className="w-full h-[1px] bg-slate-200" />

      <Text className="font-500 text-sm mb-1 mt-1">{data.city}</Text>
    </Pressable>
  );
}
