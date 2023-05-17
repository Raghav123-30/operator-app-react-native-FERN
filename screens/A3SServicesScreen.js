import { ServicesPressableCategories } from "../components/PressableCategories";
import { View, StyleSheet, FlatList } from "react-native";

import NavigatableCategoryGridTile from "../components/NavigatableCategoryTile";

export default function A3SServicesScreen({ navigation }) {
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
        data={ServicesPressableCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderNavigatableCategoryGridTile}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginTop: 100,
  },
});
