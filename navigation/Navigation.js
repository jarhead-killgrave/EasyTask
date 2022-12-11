import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TokenContext} from "../context/Context";
import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/signUpScreen";
import TodoList from "../components/TodoList";
import SignOutScreen from "../Screen/SignOutScreen";
import {createStackNavigator} from "@react-navigation/stack";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoListScreen from "../Screen/TodoListScreen";


const TodoListsStack = createStackNavigator();
const TodoListsStackScreen = () => {
    return (
        <TodoListsStack.Navigator>
            <TodoListsStack.Screen name="TodoListsScreen" component={TodoListsScreen}/>
            <TodoListsStack.Screen name="TodoListScreen" component={TodoListScreen}/>
        </TodoListsStack.Navigator>
    );
}
const Tab = createBottomTabNavigator();

export default function Navigation(){
    // The token of the connected user
    const [token, _] = useContext(TokenContext);
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
                        <Tab.Screen name="TodoLists" component={TodoListsStackScreen}/>
                        <Tab.Screen name="SignOut" component={SignOutScreen}/>
                    </Tab.Navigator>
                )
            }
        </NavigationContainer>
    );



}