import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TokenContext} from "../context/Context";
import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/signUpScreen";
import TodoListsScreen from "../Screen/TodoListsScreen";
import {ProfilScreen} from "../Screen/ProfilScreen";
import Icon from "../components/ui/Icon";



const Tab = createBottomTabNavigator();
Tab.Screen.defaultProps = {
    ...Tab.Screen.defaultProps,
    options: {
        headerShown: false,
        tabStyle: {
            backgroundColor: '#008080',
        },
        headerStyle: {
            backgroundColor: "#008080",
        },
    }

}

export default function Navigation(){
    // The token of the connected user
    const [token,] = useContext(TokenContext);
    return (
        <NavigationContainer>
            {
                token === null ? (
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;
                                if (route.name === 'SignIn') {
                                    iconName = 'user'
                                } else if (route.name === 'SignUp') {
                                    iconName = 'plus'
                                }
                                return <Icon name={iconName} size={size} style={{color: color}}/>;
                            }
                        })}
                        tabBarOptions={{
                            activeTintColor: '#fff',
                            inactiveTintColor: '#000',
                            tabStyle: {
                                backgroundColor: "#B02F13",
                            },
                            headerStyle: {
                                backgroundColor: "#B02F13",
                            }
                        }}

                    >
                        <Tab.Screen
                            options={
                                {
                                    title: "Sign In",
                                }
                            }
                            name="SignIn"
                            component={SignInScreen}/>
                        <Tab.Screen
                            options={
                                {
                                    title: "Sign Up",
                                }
                            }
                            name="SignUp" component={SignUpScreen}/>
                    </Tab.Navigator>
                ) : (
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = 'home'
                                } else if (route.name === 'TodoLists') {
                                    iconName = 'list'
                                } else if (route.name === 'Profil') {
                                    iconName = 'user'
                                }
                                return <Icon name={iconName} size={size} style={{color: color}}/>;
                            }
                        })}
                        tabBarOptions={{
                            tabStyle: {
                                backgroundColor: '#B02F13',
                            },
                            activeTintColor: '#fff',
                            inactiveTintColor: '#000',
                            headerStyle: {
                                backgroundColor: "#B02F13",
                            }
                        }}
                    >

                        <Tab.Screen
                            options={
                                {
                                    title: "Home",
                                }
                            }
                            name="Home" component={HomeScreen}/>
                        <Tab.Screen
                            options={
                                {
                                    title: "Todo Lists",
                                }
                            }
                            name="TodoLists" component={TodoListsScreen}/>
                        <Tab.Screen
                            options={
                                {
                                    title: "Profil",
                                }
                            }
                            name="Profil" component={ProfilScreen}/>
                    </Tab.Navigator>
                )
            }
        </NavigationContainer>
    );
}

