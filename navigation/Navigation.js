import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TokenContext, UsernameContext} from "../context/Context";
import HomeScreen from "../Screen/HomeScreen";
import TodoLists from "../Screen/TodoLists";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/signUpScreen";
import TodoList from "../components/TodoList";
import SignOutScreen from "../Screen/SignOutScreen";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    // The token of the connected user
    const [token, setToken] = useContext(TokenContext);

    return (
        <NavigationContainer>
            {
                token === null ? (
                    <Tab.Navigator>
                        <Tab.Screen name="SignIn" component={SignInScreen}/>
                        <Tab.Screen name="SignUp" component={SignUpScreen}/>
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="TodoLists" component={TodoLists}/>
                        <Tab.Screen name="SignOut" component={SignOutScreen}/>
                    </Tab.Navigator>
                )
            }
        </NavigationContainer>
    );


}