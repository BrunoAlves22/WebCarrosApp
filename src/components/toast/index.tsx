import { Pressable, Text, View } from "react-native";
import { MessageProps } from "../../contexts/ToastContext";

interface ToastProps {
  messages: MessageProps[];
  hideToast: () => void;
}

export function Toast({ messages, hideToast }: ToastProps) {
  return (
    <View className="absolute bottom-10 left-0 right-0 mx-4">
      {messages &&
        messages.map((item, index) => (
          <Pressable
            key={index}
            onPress={hideToast}
            className={`bg-black/70 py-3 px-5 mt-2 rounded-lg ${
              item.type === "SUCCESS" ? "bg-emerald-600" : "bg-background-default"
            }`}
          >
            <Text className="text-white font-medium text-lg">{item.message}</Text>
          </Pressable>
        ))}
    </View>
  );
}
