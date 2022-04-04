import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Text, View, Image, Pressable, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([]);

  async function save(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(error)
    }

  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    try {
      if (result) {
        // alert("🔐 Here's your value 🔐 \n" + result);


      } else {
        alert('No values stored under that key.');
      }
      return result;
    } catch (error) {
      console.error(error)
    }

  }

  const addFilm = (film) => {
    setList((current) => [...current, { id: current.length, title: film.title, resume: film.resume, comment: film.comment, rating: film.rating }]);
  };

  useFocusEffect(() => {
    if (route.params?.addFilm) {
      addFilm(route.params.addFilm);
      route.params.addFilm = null;
    }
    save("list", JSON.stringify(list))
    getValueFor("list");
  });

  return (
    <View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => {
              navigation.navigate("Détails du film", { title: item.title, resume: item.resume, comment: item.comment, rating: item.rating });
            }}>
              <Text style={styles.title}>{item.title}</Text>
              <Image style={styles.image} resizeMode="cover" source={require("../assets/SpiderMan.jpg")}></Image>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: 56,
    borderRadius: 4,
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "#D3D3D3",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20

  },
  image: {
    width: 400,
    height: 200,
    borderRadius: 30,
    margin: 5,
    alignContent: "center"
  },
  detailsBody: {
    textAlign: "center", fontSize: 30, padding: 20
  },
  bgDark: {
    backgroundColor: "#D3D3D3",
  },

});


export default HomeScreen;