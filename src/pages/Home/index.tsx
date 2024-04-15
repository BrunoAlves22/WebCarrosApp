import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, SafeAreaView, View } from "react-native";
import { CarList } from "../../components/carlist";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { CarsProps } from "../../types/cars.type";

export function Home() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      await loadCars();
    }
    fetchCars();
  }, []);

  async function loadCars() {
    const carsCollection = collection(db, "cars");
    const carsQuery = query(carsCollection, orderBy("created", "desc"));

    getDocs(carsQuery).then((querySnapshot) => {
      const carsData = [] as CarsProps[];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        carsData.push({
          id: doc.id,
          name: data.name,
          year: data.year,
          km: data.km,
          city: data.city,
          price: data.price,
          uid: data.uid,
          images: data.images,
        });
      });

      setCars(carsData);
      setLoading(false);
    });
  }

  const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null;
    return function (...args: string[]) {
      if (timer) {
        clearInterval(timer);
      }

      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  function handleInputChange(text: string) {
    setSearch(text);
    delayedApiCall(text);
  }

  const delayedApiCall = useCallback(
    debounce(async (newText: string) => {
      await fetchSearchCars(newText);
    }, 600),
    []
  );

  async function fetchSearchCars(newText: string) {
    if (newText === "") {
      loadCars();
      setSearch("");
      return;
    }

    setCars([]);

    const q = query(
      collection(db, "cars"),
      where("name", ">=", newText.toUpperCase()),
      where("name", "<=", newText.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    let carsData = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      carsData.push({
        id: doc.id,
        name: data.name,
        year: data.year,
        km: data.km,
        city: data.city,
        price: data.price,
        uid: data.uid,
        images: data.images,
      });
    });

    setCars(carsData);
    Keyboard.dismiss();
  }

  return (
    <>
      <Header />

      <SafeAreaView className="bg-background-primary px-3 flex-1 items-center">
        <View className="bg-white w-11/12 mt-3 px-2 py-1 rounded-lg ">
          <Input
            placeholder="Procurar carro"
            value={search}
            onChangeText={(text) => handleInputChange(text)}
          />
        </View>

        {loading && (
          <ActivityIndicator
            className="mt-4 flex-1 justify-center items-center"
            size="large"
            color="#000"
          />
        )}

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarList data={item} widthScreen={cars.length <= 1 ? "100%" : "49%"} />
          )}
          className="flex-1 pt-1 mt-3"
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 14 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}
