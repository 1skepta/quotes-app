import { Text, View, StyleSheet } from "react-native";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

export default function Index() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        it always seems impossible until it's done
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 30,
  },
});
