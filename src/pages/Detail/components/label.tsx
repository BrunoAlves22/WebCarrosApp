import { ReactNode } from "react";
import { Text, View } from "react-native";

interface LabelProps {
  label: string;
  children: ReactNode;
}

export function Label({ label, children }: LabelProps) {
  return (
    <View className="flex-1 gap-2">
      <Text className="text-text-grey">{label}</Text>
      {children}
    </View>
  );
}
