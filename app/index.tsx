import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
  };

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? "black" : "white",
        },
      ]}
    >
      <View style={styles.quotecontainer}>
        <Text
          style={{
            color: isDarkMode ? "white" : "black",
            fontSize: 40,
            marginBottom: 10,
          }}
        >
          ❝
        </Text>
        {advice && (
          <Text
            style={[styles.text, { color: isDarkMode ? "white" : "black" }]}
          >
            {advice}
          </Text>
        )}
      </View>
      <View style={styles.bottom}>
        <Pressable onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={isDarkMode ? "yellow" : "black"}
          />
        </Pressable>
        <Pressable onPress={getAdvice}>
          <Text style={[styles.new, { color: isDarkMode ? "white" : "black" }]}>
            Get New
          </Text>
        </Pressable>
        <Pressable>
          <Ionicons
            name="share-outline"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    textAlign: "left",
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 30,
  },
  new: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
  },
  bottom: {
    position: "absolute",
    bottom: 50,
    left: 20,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  quotecontainer: {
    flexDirection: "row",
  },
});
