import { useFocusEffect, useNavigation, useRoute, } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, FlatList, View, Text, Image, Pressable, StyleSheet, TextInput } from "react-native";
import AddScreen from "./AddScreen";
import HomeScreen from "./HomeScreen";

const API = () => {
    const [valid, setValid] = useState(false);
    const [name, setName] = useState();
    const [list, setList] = useState([]);
    const navigation = useNavigation();
    const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=da54f4648a6050b16f34a0f0141e851f&language=fr&query=  ";

    const fetchFilm = async (name) => {
        let res = await fetch(baseUrl + name);
        let json = await res.json();
        return json
    };
    return (
        <View>
            <TextInput
                value={name}
                placeholder="Titre du film"
                onChangeText={setName}
                style={{
                    height: 56,
                    borderRadius: 4,
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderColor: "#D3D3D3",
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
            />
            <Button
                title="Rechercher"
                onPress={() => {
                    fetchFilm(name).then((json) => {
                        for (let i = 0; i < json.results.length; i++) {
                            setList((current) => [...current, {
                                id: current.length,
                                title: json.results[i].title,
                                resume: json.results[i].overview,
                                comment: "",
                                image: "https://image.tmdb.org/t/p/w500" + json.results[i].poster_path,
                                rating: 0
                            }])
                        }
                        console.log(list)
                    })

                }}></Button>
            <View>
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <View>
                            <Pressable onPress={() => {
                                navigation.navigate("Détails du film", { title: item.title, resume: item.resume, comment: item.comment, rating: item.rating, image: item.image });
                            }}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Image style={styles.image} resizeMode="cover" source={item.image != "" ? { uri: item.image } : require("../assets/SpiderMan.jpg")}></Image>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

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

export default API;