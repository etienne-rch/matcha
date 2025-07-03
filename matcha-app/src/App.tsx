import "../global.css"
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-green-white">
      <Text className="text-xl font-bold text-green-500 ">
        Welcome to Matcha!
      </Text>
    </View>
  );
}