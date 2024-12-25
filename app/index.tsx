import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [advice, setAdvice] = useState("");
  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice").then((response) =>
      response
        .json()
        .then((data) => {
          setAdvice(data.slip.advice);
        })
        .catch((error) => console.error("Error fetching advice ", error))
    );
  };

  const getAdvice = () => {
    fetchAdvice();
  };

  return (
    <View style={styles.container}>
      {advice && <Text style={styles.text}>{advice}</Text>}
      <View style={styles.bottom}>
        <Pressable onPress={getAdvice}>
          <Text style={styles.new}>Get New</Text>
        </Pressable>
        <Pressable>
          <Ionicons name="share-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    textAlign: "left",
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 30,
  },
  new: {
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    marginTop: 20,
    textAlign: "right",
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    left: 20,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
