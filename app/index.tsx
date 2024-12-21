import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";

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
      <Pressable onPress={getAdvice}>
        <Text style={styles.new}>Get New</Text>
      </Pressable>
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
});
