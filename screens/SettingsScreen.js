import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../components/Context/AuthContext";

export default function SettingsScreen({ children }) {
  const {
    mode,
    setMode,

    village,
    setVillage,
    villageCrops,
    setVillageCrops,
  } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>This is Settings Screen</Text>
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
