// import { View, Text, StyleSheet } from "react-native";

// export default function CurrentLayoutScreen() {
//   return (
//     <View>
//       <Text>This is current layout screen</Text>
//     </View>
//   );
// }
import { View, Text, StyleSheet } from "react-native";

export default function CurrentLayoutScreen({ children }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is current layout page</Text>
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
