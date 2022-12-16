import React, {useState, useContext, useEffect} from "react";
import {StyleSheet, Text, View, Modal, TextInput} from "react-native";
import {UsernameContext, TokenContext} from "../context/Context";
import ButtonComponent from "../components/ui/ButtonComponent";
import {changeUserName} from "../api/crudUser";


/**
 * The screen that displays the profile of the user.
 * The user can log out from this screen. He can also see and change his username and password.
 * If the user is an admin, he can also see the list of users and delete them.
 *
 * @param props the properties of the component
 */
export function ProfilScreen(props) {

        const [username, setUsername] = useContext(UsernameContext);
        const [token,setToken] = useContext(TokenContext);

        const [showUsernameModal, setShowUsernameModal] = useState(false);

        // The new username
        const [newUsername, setNewUsername] = useState("");

        useEffect(() => {
            props.navigation.setOptions({
                headerShown: true,
                headerTitle: "Profil",
                headerStyle: {
                    backgroundColor: "#008080",
                },
                headerTintColor: "#fff",
            });
        }, []);

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Profil</Text>
                <Text style={styles.text}>Username: {username}</Text>
                <ButtonComponent title="Change username" onPress={() => setShowUsernameModal(true)}/>
                <ButtonComponent title="Log out" onPress={() => {
                    setUsername(null);
                    setToken(null);
                }
                }/>
                <Modal visible={showUsernameModal} animationType="slide"
                          onRequestClose={() => setShowUsernameModal(false)}
                       transparent={true}>

                    <View style={styles.container}>
                        <Text style={styles.title}>Change username</Text>
                        <Text style={styles.text}>New username:</Text>
                        <TextInput style={styles.input} onChangeText={text => setNewUsername(text)}/>
                        <ButtonComponent title="Change" onPress={() => {
                            // Call the changeUsername function with the token, username and the new username
                            changeUserName(username,newUsername, token).then(data => {
                                setUsername(data);
                                setShowUsernameModal(false);
                            }).catch(error => {
                                console.log(error.message);
                            })
                        }
                        }/>
                        <ButtonComponent title="Cancel" onPress={() => setShowUsernameModal(false)}/>
                    </View>
                </Modal>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#777",
        padding: 8,
        margin: 10,
        width: 200
    },
});
