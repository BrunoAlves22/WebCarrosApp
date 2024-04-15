import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ViewMoreText from "react-native-view-more-text";
import * as Linking from "expo-linking";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useStorage from "../../hooks/useStorage";
import { useToast } from "../../hooks/useToast";
import { StackParamList } from "../../routes";
import { db } from "../../services/firebaseConnection";
import { CarDetailProps } from "../../types/cars.type";
import { BannerLoading } from "./components/banner";
import { Label } from "./components/label";
import { ModalBanner } from "./components/modal";
import { Slider } from "./components/slider";
import { currencyMask } from "../../masks/currencymask";

type RouteDetailParams = {
  detail: {
    id: string;
  };
};

type DetailRouteProp = RouteProp<RouteDetailParams, "detail">;

export function Detail() {
  const route = useRoute<DetailRouteProp>();
  const [car, setCar] = useState<CarDetailProps>();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState<string>();
  const { saveItem } = useStorage();
  const { showToast } = useToast();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  useEffect(() => {
    async function fetchDetail() {
      if (!route.params.id) return;

      const docRef = doc(db, "cars", route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (!docSnap.exists()) return navigation.goBack();

        const data = docSnap.data();
        setCar({
          id: docSnap.id,
          name: data?.name,
          model: data?.model,
          year: data?.year,
          km: data?.km,
          city: data?.city,
          price: data?.price,
          description: data?.description,
          created: data?.created,
          owner: data?.owner,
          uid: data?.uid,
          whatsapp: data?.whatsapp,
          images: data?.images,
        });
      }
      setLoading(false);
    }

    fetchDetail();
  }, [route.params.id]);

  async function handleCallPhone() {
    await Linking.openURL(`tel:${car?.whatsapp}`);
  }

  function openImage(imageUrl: string) {
    setModalVisible(true);
    setImageSelected(imageUrl);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setImageSelected("");
  }

  async function handleSaveCar(id: string) {
    // Implementar lógica para favoritar um carro
    if (!car) return;

    await saveItem(car);
    showToast("Carro salvo com sucesso", "SUCCESS");
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center ">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="bg-background-primary " showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="flex-1 bg-background-primary items-center pb-4">
          <Pressable
            className="w-12 h-12 rounded-full bg-white justify-center items-center absolute top-11 left-6 z-50"
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons size={22} name="arrow-back" color="#000" />
          </Pressable>

          {loading && <BannerLoading />}

          {!loading && car?.images && (
            <Slider images={car.images} handleOpenImage={(imageUrl) => openImage(imageUrl)} />
          )}

          <View className="bg-white relative w-11/12 rounded-lg gap-1 py-4 px-2 -top-8 z-50">
            <Pressable
              onPress={() => {
                handleSaveCar(car!.id);
              }}
              className="bg-background-fav absolute p-3 rounded-full right-2 -top-6 z-50"
            >
              <MaterialIcons size={22} color="#fff" name="star" />
            </Pressable>

            <Text className="font-bold text-lg">{car?.name}</Text>
            <Text className="font-medium">{car?.model}</Text>
          </View>

          <View className="py-3 px-3 -mt-3 w-11/12 bg-white rounded-lg">
            <Text className="text-2xl font-bold text-black">
              {currencyMask(Number(car?.price))}
            </Text>

            <View className="flex-row items-start gap-6 mt-4">
              <Label label="Cidade">
                <Text className="font-medium text-xl">{car?.city}</Text>
              </Label>

              <Label label="Ano">
                <Text className="font-medium text-xl">{car?.year}</Text>
              </Label>
            </View>

            <View className="flex-row items-start gap-6 mt-4">
              <Label label="KM Rodados">
                <Text className="font-medium text-xl">{car?.km}</Text>
              </Label>

              <Label label="Telefone">
                <Text className="font-medium text-xl">{car?.whatsapp}</Text>
              </Label>
            </View>
          </View>

          <View className="py-3 px-3 mt-4 w-11/12 bg-white rounded-lg">
            <Label label="Descrição">
              <ViewMoreText numberOfLines={3}>
                <Text className="font-medium text-xl ">{car?.description}</Text>
              </ViewMoreText>
            </Label>
          </View>

          <View className="mt-10 w-11/12">
            <Pressable
              onPress={handleCallPhone}
              className="flex-row gap-2 justify-center items-center py-3 px-3 bg-background-wpp rounded-lg"
            >
              <MaterialIcons size={22} color="#fff" name="phone" />
              <Text className="font-medium text-base text-white">Conversar com o vendedor</Text>
            </Pressable>
          </View>

          <Modal visible={modalVisible} transparent={true}>
            <ModalBanner closeModal={handleCloseModal} imageUrl={imageSelected} />
          </Modal>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
