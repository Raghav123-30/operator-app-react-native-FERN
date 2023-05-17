import { View, Text, StyleSheet } from "react-native";

export default function DispatchScreen({ children }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is Dispatch Screen</Text>
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
