import { View, Text, StyleSheet } from "react-native";

export default function InputSupplyScreen({ children }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is input supply page</Text>
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
