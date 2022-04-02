import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddScreen from './component/AddScreen';
import HomeScreen from "./component/HomeScreen";
import Details from "./component/Details";
import Login from "./component/Login";
import API from "./component/API";




const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const isLogged = false;


/*const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ addFilm: null }}
        />
        <Stack.Screen name="Ajout de film" component={AddScreen} />
        <Stack.Screen name="Détails du film" component={Details} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};*/

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const Main = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Ajouter un film") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "Détails du film") {
            iconName = focused ? "eye-sharp" : "eye-outline";
          } else if (route.name == "api") {
            iconName = focused ? "globe" : "globe-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} initialParams={{ addFilm: null }} />
      <Tabs.Screen
        name="Ajouter un film"
        component={AddScreen}
      />
      <Tabs.Screen
        name="Détails du film"
        component={Details}
      />
      <Tabs.Screen
        name="api"
        component={API}>

      </Tabs.Screen>
    </Tabs.Navigator>
  );

}



export default App;