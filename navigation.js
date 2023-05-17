import { Alert, StyleSheet, Text, View } from "react-native";
import NewBookingScreen from "./screens/NewBookingScreen";
import StatusScreen from "./screens/StatusScreen";
import InputSupplyScreen from "./screens/InputSupplyScreen";
import AddFarmerScreen from "./screens/AddFarmerScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OtherOperatorTile from "./components/OtherOperatorTile";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import OtherOperatorsScreen from "./screens/OtherOperatorsScreen";
import CurrentLayoutScreen from "./screens/CurrentLayoutScreen";
import HomeScreen from "./screens/HomeScreen";
import A3SServicesScreen from "./screens/A3SServicesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./screens/SettingsScreen";
import BookedScreen from "./screens/BookedScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import DispatchScreen from "./screens/DispatchScreen";
import MarketScreen from "./screens/MarketScreen";
import { Card, Button, TextInput } from "react-native-paper";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAuth } from "./components/Context/AuthContext";
import { useEffect, useState } from "react";

export default function Navigation() {
  let counter = 0;
  const {
    phone,
    setPhone,
    mode,
    setMode,
    crops,
    setCrops,
    location,
    setLocation,
    numTrays,
    setNumTrays,
    numRacks,
    setNumRacks,

    loggedIn,
    setLoggedIn,
    taluk,
    setTaluk,
    village,
    setVillage,
    villageCrops,
    setVillageCrops,
    alldocuments,
    setDocuments,
    villageId,
    setVillageId,
  } = useAuth();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  async function fetchDocuments() {
    const operatorCollectionRef = collection(db, "Operator");
    const documents = [];
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            fullname: doc.data().fullName,
            phone: doc.data().phone,
            locationId: doc.data().locationId,
            location: doc.data().location,
          };
          console.log(document);
          documents.push(document);
        });
        setDocuments(documents);
      })
      .catch((error) => {
        console.log("Failed", error);
      });
  }
  async function initialSetup() {
    const result = alldocuments.find((item) => item.phone == phone);
    if (result && phone.trim().length == 10) {
      const locationDocumentnRef = doc(db, "Location", result.locationId);
      const locationData = await getDoc(locationDocumentnRef);
      console.log(locationData);
      if (locationData.exists()) {
        console.log(locationData.data());
        const villageID = locationData.data().villageid;
        setVillageId(villageID);
        // const villageCollectionRef = doc(db, "village", villageID);
        // const villageData = await getDoc(villageCollectionRef);
        // if (villageData.exists()) {
        //   console.log(villageData.data());
        //   setTaluk(villageData.data().taluk);
        //   setVillage(villageData.data().villageName);
        //   const cropLists = [];
        //   const CropListCollectionRef = collection(db, "Crop_List");
        //   await getDocs(CropListCollectionRef)
        //     .then((snapshots) => {
        //       snapshots.forEach((doc) => {
        //         const singleCrop = {
        //           cropname: doc.data().cropname,
        //           mode: doc.data().mode,
        //           period: doc.data().period,
        //           villageid: doc.data().villageid,
        //         };
        //         cropLists.push(singleCrop);
        //       });
        //     })
        //     .then(() => {
        //       setVillageCrops(
        //         cropLists.filter((item) => {
        //           return item.villageid == villageID;
        //         })
        //       );
        //       console.log("Crops we got so far is ", villageCrops);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        return true;
      }

      console.log("we found this", result);
    } else {
      return false;
    }
  }
  useEffect(() => {
    fetchDocuments();
  }, []);
  useEffect(() => {
    initialSetup();
    counter += 1;
  }, [phone]);

  async function handleLogIn() {
    if (initialSetup()) {
      setLoggedIn(true);
    } else {
      Alert.alert(
        "Not authorized",
        "Not registered with pequrel, please contact administrator",
        [
          {
            text: "Okay",
          },
        ]
      );
      setPhone("");
    }
  }
  function HandleLogout() {
    const navigation = useNavigation();
    const route = useRoute();
    Alert.alert("Confirm", "Do you want to log out?", [
      {
        text: "Okay",
        style: "cancel",
        onPress: () => {
          setLoggedIn(false);
        },
      },
      {
        text: "Cancel",
        style: "destructive",
        onPress: () => {
          if (route.name !== "Home") {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
        },
      },
    ]);
  }
  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#D8E1FF",
          drawerActiveTintColor: "#3c0a6b",
          headerStyle: { backgroundColor: "#3c0a6b" },
          headerTintColor: "white",
          drawerContentStyle: {
            backgroundColor: "#F3F3F3",
          },
          drawerInactiveTintColor: "#000",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Current Layout"
          component={CurrentLayoutScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="layers-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Other operators info"
          component={OtherOperatorsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={HandleLogout}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-out-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  if (loggedIn) {
    return (
      <>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#3c0a6b" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "#3c0a6b" },
              }}
            >
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Add farmer"
                component={AddFarmerScreen}
                options={{
                  title: "Add New Farmer",
                }}
              />
              <Stack.Screen
                name="A3S Services"
                component={A3SServicesScreen}
                options={{
                  title: "Services",
                }}
              />
              <Stack.Screen
                name="Status"
                component={StatusScreen}
                options={{
                  title: "Status",
                }}
              />
              <Stack.Screen
                name="Input supply"
                component={InputSupplyScreen}
                options={{
                  title: "Input supply",
                }}
              />
              <Stack.Screen
                name="New Booking"
                component={NewBookingScreen}
                options={{
                  title: "New Booking",
                }}
              />
              <Stack.Screen
                name="Booked"
                component={BookedScreen}
                options={{
                  title: "Booked",
                }}
              />
              <Stack.Screen
                name="Processing"
                component={ProcessingScreen}
                options={{
                  title: "Processing",
                }}
              />
              <Stack.Screen
                name="Dispatch"
                component={DispatchScreen}
                options={{
                  title: "Dispatch",
                }}
              />
              <Stack.Screen
                name="Market"
                component={MarketScreen}
                options={{
                  title: "Market",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </>
    );
  } else if (!loggedIn) {
    return (
      <View style={styles.logInContainer}>
        <Card mode="contained">
          <Card.Title
            title="Login to continue!"
            titleStyle={{ textAlign: "center", margin: 8, fontWeight: "bold" }}
            mode="contained"
          ></Card.Title>
          <Card.Content>
            <TextInput
              label="Phone"
              placeholder="XXXXXXXXXX"
              keyboardType="number-pad"
              style={{ marginBottom: 16 }}
              mode="flat"
              onChangeText={(text) => {
                setPhone(text);
              }}
            ></TextInput>
            <Button
              mode="contained"
              onPress={handleLogIn}
              style={{ backgroundColor: "#0e7490" }}
            >
              Submit
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E1",
  },
  logInContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
});
