import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Detail } from "../pages/Detail";
import { Favorites } from "../pages/Favorites";
import { Home } from "../pages/Home";

export type StackParamList = {
  home: undefined;
  detail: { id: string };
  favorites: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detail" component={Detail} />
      <Stack.Screen name="favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
