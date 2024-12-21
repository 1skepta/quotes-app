import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <div>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go Back To Home Screen
        </Link>
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
