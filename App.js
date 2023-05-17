import Navigation from "./navigation";
import { AuthProvider } from "./components/Context/AuthContext";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "./components/Context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E1",
  },
});
