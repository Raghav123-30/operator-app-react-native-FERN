import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function OtherOperatorTile({ fullName, location, phone }) {
  return (
    <View style={styles.container}>
      <Card mode="contained" style={{ width: "80%" }}>
        <Card.Content>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Name</Text>
            <Text>{fullName}</Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>location</Text>
            <Text>{location}</Text>
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Phonenumber</Text>
            <Text>{phone}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginVertical: 12,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
