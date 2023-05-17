import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { db } from "../firebase";
import { useAuth } from "../components/Context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import OtherOperatorTile from "../components/OtherOperatorTile";

export default function OtherOperatorsScreen({ children }) {
  const { phone } = useAuth();
  function renderOtherOperatorTile({ item }) {
    return (
      <OtherOperatorTile
        fullName={item.fullName}
        location={item.location}
        phone={item.phone}
      />
    );
  }
  const [available, setAvailable] = useState(false);
  const [Operators, setOperators] = useState([]);
  useEffect(() => {
    async function getData() {
      const operatorCollection = collection(db, "Operator");
      let documents = [];

      try {
        const snapshots = await getDocs(operatorCollection);
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            fullName: doc.data().fullName,
            phone: doc.data().phone,
            location: doc.data().location,
          };
          documents.push(document);
        });

        console.log(phone);
        documents = documents.filter((item) => {
          return item.phone != phone;
        });
        setOperators(documents);
        setAvailable(true);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  if (available) {
    return (
      <View>
        <FlatList
          data={Operators}
          keyExtractor={(item) => item.id}
          renderItem={renderOtherOperatorTile}
        />
      </View>
    );
  } else if (!available) {
    return (
      <ActivityIndicator
        animating={true}
        color={MD2Colors.red800}
      ></ActivityIndicator>
    );
  }
}
