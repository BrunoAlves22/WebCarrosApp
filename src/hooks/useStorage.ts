import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarsProps } from "../types/cars.type";

const key = "@webcars";

const useStorage = () => {
  //Busca os carros salvos no storage
  const getItem = async (): Promise<CarsProps[]> => {
    try {
      const getCars = await AsyncStorage.getItem(key);
      return (getCars && JSON.parse(getCars)) || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Salva um carro no storage
  const saveItem = async (newCar: CarsProps) => {
    try {
      const cars = await getItem();
      let findCar = cars.find((car) => car.id === newCar.id);

      if (findCar) return;

      cars.push(newCar);

      await AsyncStorage.setItem(key, JSON.stringify(cars));
      console.log("Carro salvo com sucesso");
    } catch (error) {
      console.log("Erro ao salvar o carro", error);
    }
  };

  //Deletar um carro do storage
  const deleteItem = async (id: string): Promise<CarsProps[] | [] | undefined> => {
    try {
      let cars = await getItem();
      let updateCarList = cars.filter((car) => {
        return car.id !== id;
      });

      await AsyncStorage.setItem(key, JSON.stringify(updateCarList));
      return updateCarList;
    } catch (error) {
      console.log("Erro ao deletar o carro", error);
    }
  };

  return { getItem, saveItem, deleteItem };
};

export default useStorage;
