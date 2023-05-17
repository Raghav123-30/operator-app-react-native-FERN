import { View, Text, StyleSheet } from "react-native";

export default function ProcessingScreen({ children }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is Processing Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
