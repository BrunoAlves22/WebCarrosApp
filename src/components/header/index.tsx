import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView } from "react-native";
import { StackParamList } from "../../routes";
import { SvgComponent } from "../svg";

export function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  return (
    <SafeAreaView className="bg-background-primary flex-row px-3 pt-3 items-center justify-between ">
      <SvgComponent />

      <Pressable
        onPress={() => {
          navigation.navigate("favorites");
        }}
        className="bg-background-btn w-11 h-11 rounded-full items-center justify-center"
      >
        <MaterialIcons name="hotel-class" size={22} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
