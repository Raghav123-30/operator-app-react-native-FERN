import { View, StyleSheet, FlatList } from "react-native";
import { PressableCategories } from "../components/PressableCategories";
import NavigatableCategoryGridTile from "../components/NavigatableCategoryTile";
import { db } from "../firebase";
import { getDoc, collection, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/AuthContext";

export default function HomeScreen({ navigation }) {
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
  } = useAuth();

  function renderNavigatableCategoryGridTile({ item }) {
    function pressHandler() {
      navigation.navigate(item.name);
    }
    return (
      <NavigatableCategoryGridTile
        name={item.name}
        color={item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <View style={styles.app}>
      <FlatList
        data={PressableCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderNavigatableCategoryGridTile}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginTop: 150,
  },
});
