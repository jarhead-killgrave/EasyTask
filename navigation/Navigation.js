import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TokenContext} from "../context/Context";
import HomeScreen from "../Screen/HomeScreen";
import TodoListsScreen from "../Screen/TodoListsScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/signUpScreen";
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
                        <Tab.Screen name="TodoLists" component={TodoListsScreen}/>
                        <Tab.Screen name="SignOut" component={SignOutScreen}/>
                    </Tab.Navigator>
                )
            }
        </NavigationContainer>
    );


}