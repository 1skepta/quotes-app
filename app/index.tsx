import React, { useRef } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

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

  const viewRef = useRef<View>(null);

  const shareScreenshot = async () => {
    try {
      setTimeout(async () => {
        try {
          const uri = await captureRef(viewRef, {
            format: "png",
            quality: 0.8,
          });

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
          } else {
            console.log("Sharing is not available on this device");
          }
        } catch (error) {
          console.error("Error capturing or sharing screenshot:", error);
        }
      }, 500);
    } catch (error) {
      console.error("Error while initiating sharing:", error);
    }
  };

  return (
    <View style={styles.container} ref={viewRef}>
      {advice && <Text style={styles.text}>{advice}</Text>}
      <View style={styles.bottom}>
        <Pressable onPress={getAdvice}>
          <Text style={styles.new}>Get New</Text>
        </Pressable>
        <Pressable onPress={shareScreenshot}>
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
