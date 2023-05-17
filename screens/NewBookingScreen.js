import { View, StyleSheet, Alert, Pressable, Modal } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  MD2Colors,
  TextInput,
  Button,
  RadioButton,
  Text,
} from "react-native-paper";
import { Card } from "react-native-paper";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useAuth } from "../components/Context/AuthContext";

const cropData = [
  { key: "Wheat", value: "wheat", duration: 7 },
  { key: "Corn", value: "corn", duration: 7 },
  { key: "Rice", value: "rice", duration: 5 },
  { key: "Barley", value: "barley", duration: 2 },
];

export default function NewBookingScreen({ navigation }) {
  const { villageCrops, villageId, setVillageCrops } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [available, setAvailable] = useState(false);
  const [Farmers, setFarmers] = useState([]);
  const [duration, setDuration] = useState(0);
  const [startBooking, setStartBooking] = useState(false);

  const [farmername, setFarmerName] = useState("");
  const [farmerphone, setFarmerPhone] = useState("");
  const [farmeraddress, setFarmerAddress] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("growing");

  const [minimumDate, setMinimumDate] = useState("");
  useEffect(() => {
    setNewDispatchDate(duration);
  }, [arrivalDate, selectedCrop]);
  useEffect(() => {
    async function fetchData() {
      const villageCollectionRef = doc(db, "village", villageId);
      const villageData = await getDoc(villageCollectionRef);
      if (villageData.exists()) {
        console.log(villageData.data());

        // setTaluk(villageData.data().taluk);
        // setVillage(villageData.data().villageName);
        const cropLists = [];
        const CropListCollectionRef = collection(db, "Crop_List");
        await getDocs(CropListCollectionRef)
          .then((snapshots) => {
            snapshots.forEach((doc) => {
              const singleCrop = {
                cropname: doc.data().cropname,
                mode: doc.data().mode,
                period: doc.data().period,
                villageid: doc.data().villageid,
              };
              cropLists.push(singleCrop);
            });
          })
          .then(() => {
            setVillageCrops(
              cropLists.filter((item) => {
                return item.villageid == villageId;
              })
            );
            console.log("Crops we got so far is ", villageCrops);
            console.log(villageId);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (villageCrops.length == 0) {
        await fetchData();
      }
    }
    async function setup() {
      await fetchData();
    }
    setup();
  }, []);
  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString();
    setCurrentDate(`${year}/${month}/${day}`);
    setMinimumDate(`${year}/${month}/${day}`);
    console.log(today);
    async function getFarmersData() {
      try {
        const farmerCollection = collection(db, "Farmer");
        const documents = [];

        const snapshots = await getDocs(farmerCollection);
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            farmername: doc.data().farmername,
            farmerphone: doc.data().farmerphone,
            farmeraddress: doc.data().farmeraddress,
          };
          documents.push(document);
        });

        setFarmers(documents);
        console.log(Farmers);
        setAvailable(true);
      } catch (error) {
        console.error(error);
      }
    }

    getFarmersData();
  }, []);
  function dateActivityHandler(date) {
    const [year, month, day] = date.split("/");
    const newArrivalDate = `${day}-${month}-${year}`;
    setArrivalDate(newArrivalDate);
    // setSelectedCrop("");
  }
  function setNewDispatchDate(days) {
    console.log(arrivalDate);
    const [day, month, year] = arrivalDate.split("-");
    const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
    const myDate = new Date(isoDate);
    myDate.setDate(myDate.getDate() + days);
    const newDay = myDate.getDate().toString().padStart(2, "0");
    const newMonth = (myDate.getMonth() + 1).toString().padStart(2, "0");
    const newYear = myDate.getFullYear().toString();
    const newDispatchDate = `${newDay}-${newMonth}-${newYear}`;
    setDispatchDate(newDispatchDate);
    console.log(dispatchDate);
  }
  function handleSubmit() {
    console.log(`Dispatch date is ${dispatchDate}`);
    if (!dispatchDate) {
      Alert.alert(
        "Incomplete boking",
        "Please check for arrival and dispatch date",
        ["okay"]
      );
    } else {
      console.log(
        farmername,
        farmerphone,
        farmeraddress,
        arrivalDate,
        mode,
        dispatchDate,
        selectedCrop
      );
    }
  }
  function checkForRegistration() {
    if (!(farmerphone.trim().length == 10)) {
      Alert.alert(
        "Invalid number",
        "Please enter a valid 10 digit phone number",
        ["okay"]
      );
    } else {
      const isPhoneExists = Farmers.find(
        (farmer) => farmer.farmerphone == farmerphone
      );
      if (isPhoneExists) {
        console.log(isPhoneExists);
        setStartBooking(true);
        setFarmerName(isPhoneExists.farmername);
        setFarmerAddress(isPhoneExists.farmeraddress);
      } else {
        Alert.alert(
          "Farmer is not registered",
          "Unfortunately farmer is not registered through the app, on clicking okay you will be taken to registration page, please register the farmer before starting the booking process",
          [
            {
              text: "okay",
              onPress: () => {
                navigation.navigate("Add farmer");
              },
            },
          ]
        );
      }
    }
  }

  if (available && !startBooking) {
    return (
      <View style={styles.container}>
        <Card mode="contained" style={styles.card}>
          <Card.Title
            title="Is Farmer Registered?"
            titleStyle={{ textAlign: "center", fontWeight: "bold" }}
          ></Card.Title>
          <Card.Content>
            <TextInput
              style={styles.textInput}
              placeholder="Phone number"
              keyboardType="number-pad"
              onChangeText={(text) => {
                setFarmerPhone(text);
              }}
            ></TextInput>

            <Button
              style={{ backgroundColor: "#0e7490" }}
              mode="contained"
              onPress={checkForRegistration}
            >
              Check
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  } else if (available && startBooking) {
    return (
      <View style={styles.container}>
        <Card mode="contained" style={styles.card}>
          <Card.Title
            title="Continue with booking!"
            titleStyle={{ textAlign: "center", fontWeight: "bold" }}
          ></Card.Title>
          <Card.Content>
            <TextInput
              label="Full name"
              disabled
              style={styles.textInput}
              value={farmername}
            ></TextInput>

            <TextInput
              label="Phone"
              style={styles.textInput}
              placeholder="Phone number"
              value={farmerphone}
              disabled
            ></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Address"
              label="address"
              disabled
              value={farmeraddress}
            ></TextInput>

            <View style={{ flexDirection: "row", marginVertical: 12 }}>
              <RadioButton
                value="growing"
                status={mode === "growing" ? "checked" : "unchecked"}
                onPress={() => setMode("growing")}
              />
              <Text style={{ alignSelf: "center" }}>Growing</Text>
              <RadioButton
                value="drying"
                status={mode === "drying" ? "checked" : "unchecked"}
                onPress={() => setMode("drying")}
              />
              <Text style={{ alignSelf: "center" }}>Drying</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 12,

                alignItems: "center",
              }}
            >
              <TextInput
                label="Arrival date"
                style={{ flex: 1, marginRight: 8 }}
                placeholder="Pick Arrival date"
                keyboardType="number-pad"
                value={arrivalDate}
                disabled
              ></TextInput>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => setOpen(true)}
              >
                <Ionicons name="calendar" size={30} />
              </Pressable>
            </View>
            {arrivalDate && (
              <SelectList
                placeholder="Pick crop"
                setSelected={(value) => {
                  const selectedItem = cropData.find(
                    (item) => item.value === value
                  );
                  console.log(selectedItem.duration);
                  setDuration(selectedItem.duration);
                  setNewDispatchDate(selectedItem.duration);
                  console.log(dispatchDate);
                  setSelectedCrop(selectedItem.value || "");
                  value = { selectedCrop };
                }}
                data={cropData}
                save="value"
              />
            )}

            {selectedCrop && (
              <TextInput
                label="Dispatch date"
                style={[styles.textInput, { marginBottom: 20 }]}
                placeholder="Expected dispatch date"
                value={dispatchDate}
                disabled
              ></TextInput>
            )}

            <Button
              style={{ backgroundColor: "#0e7490", marginTop: 16 }}
              mode="contained"
              onPress={handleSubmit}
            >
              Confirm booking
            </Button>
          </Card.Content>
        </Card>

        <Modal visible={open} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <DatePicker
              current={currentDate}
              minimumDate={minimumDate}
              maximumDate="2090/05/06"
              onDateChange={dateActivityHandler}
            />

            <Pressable
              onPress={() => {
                setOpen(false);
              }}
            >
              <Text style={{ color: "blue", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  } else if (!available) {
    return (
      <View style={styles.ActivityIndicator}>
        <ActivityIndicator animating={true} color={MD2Colors.red800}>
          Loading...
        </ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  ActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginVertical: 12,
  },
  card: {
    width: "85%",
    padding: 16,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
});
