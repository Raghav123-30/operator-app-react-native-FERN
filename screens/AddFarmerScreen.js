import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddFarmerScreen({ navigation }) {
  const [farmername, setFarmerName] = useState("");
  const [farmerphone, setFarmerPhone] = useState("");
  const [farmeraddress, setFarmerAddress] = useState("");

  async function handleSubmit() {
    console.log("Name:", farmername);
    console.log("Phone number:", farmerphone);
    console.log("Address:", farmeraddress);

    const testCollection = collection(db, "Farmer");
    try {
      await addDoc(testCollection, {
        farmername: farmername,
        farmerphone: farmerphone,
        farmeraddress: farmeraddress,
      })
        .then(() => {
          console.log("Data added successfully");
          Alert.alert("Success", "Farmer added successfully", [
            {
              text: "Okay",
              onPress: () => navigation.navigate("Home"),
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="contained">
        <Card.Title
          title="Add Farmer"
          titleStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        />

        <Card.Content>
          <TextInput
            label="Name"
            value={farmername}
            onChangeText={(text) => setFarmerName(text)}
            style={styles.textinput}
            mode="flat"
          />
          <TextInput
            label="Phone Number"
            value={farmerphone}
            onChangeText={(text) => setFarmerPhone(text)}
            style={styles.textinput}
            keyboardType="number-pad"
            mode="flat"
          />
          <TextInput
            label="Address"
            value={farmeraddress}
            onChangeText={(text) => setFarmerAddress(text)}
            style={styles.textinput}
            mode="flat"
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{ backgroundColor: "#0e7490" }}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textinput: {
    marginVertical: 12,
  },
  card: {
    width: "80%",
    padding: 16,
  },
});
