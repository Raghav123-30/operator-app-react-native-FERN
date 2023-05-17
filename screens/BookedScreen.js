import { View, Text, StyleSheet } from "react-native";

export default function BookedScreen({ children }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is Booked Screen</Text>
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
