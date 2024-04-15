import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { CarList } from "../../components/carlist";
import useStorage from "../../hooks/useStorage";
import { useToast } from "../../hooks/useToast";
import { StackParamList } from "../../routes";
import { CarsProps } from "../../types/cars.type";

export function Favorites() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [cars, setCars] = useState<CarsProps[] | undefined>([]);
  const { getItem, deleteItem } = useStorage();
  const isFocused = useIsFocused();
  const { showToast } = useToast();

  useEffect(() => {
    async function getCars() {
      const data = await getItem();
      setCars(data);
    }
    getCars();
  }, [isFocused]);

  async function handleDeleteCar(id: string) {
    const listcars = await deleteItem(id);
    if (!listcars) return;
    setCars(listcars);
    showToast("Carro removido com sucesso", "DEFAULT");
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary px-4">
      <View className="flex-row items-center gap-6 py-2 mb-4">
        <Pressable className="bg-white p-2 rounded-full" onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </Pressable>
        <View className="bg-white py-3 px-5 rounded-full">
          <Text className="text-xl font-bold">Favoritos</Text>
        </View>
      </View>

      <View className="items-center justify-center mb-4">
        <Text className="text-lg text-gray-400 font-semibold">Segure para excluir</Text>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarList
            data={item}
            widthScreen={"100%"}
            enableDelete={true}
            deleteItem={() => handleDeleteCar(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
