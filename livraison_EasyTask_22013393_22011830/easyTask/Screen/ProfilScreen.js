import React, {useContext, useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import {TokenContext, UsernameContext} from "../context/Context";
import ButtonComponent from "../components/ui/ButtonComponent";
import {changeUserName, deleteUser, getUser, getUsers} from "../api/crudUser";
import Item from "../components/ui/Item";
import {UserList} from "../components/UserList";


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
        const [showListUsersModal, setShowListUsersModal] = useState(false);
        const [users, setUsers] = useState([]);

        // The new username
        const [newUsername, setNewUsername] = useState("");
        const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getUser(username, token).then(user => {
            if(user.roles.includes("admin")){
                setIsAdmin(true);
            }
        })
    }, []);



    useEffect(() => {
        getUsers(token).then((response) => {
            const liste = response.map((user) => ({id: user.id, content: user.username, roles : user.roles}));
            console.log(liste);
            setUsers([...liste]);
            console.log(users);
        }).catch((error) => {
            console.log(error);
        })
    }, [isAdmin]);

        useEffect(() => {
            props.navigation.setOptions({
                headerShown: true,
                headerTitle: "Profil",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#B02F13",
                }
            });
        }, []);

        // Delete an user
        const handleDeleteUser = (id) => {
            deleteUser(id, token).then((nodeDeleted) => {
                if(nodeDeleted > 0) {
                    const newUsers = users.filter((user) => user.id !== id);
                    setUsers(newUsers);
                }
            }).catch((error) => {
                console.log(error);
            })
        }

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Profil</Text>
                <Text style={styles.text}>Username: {username}</Text>
                <ButtonComponent title="Change username" onPress={() => setShowUsernameModal(true)}/>
                {isAdmin && <ButtonComponent title="Liste des utilisateurs" onPress={() => setShowListUsersModal(true)}/>}
                <ButtonComponent title="Log out" onPress={() => {
                    setUsername(null);
                    setToken(null);
                }
                }/>
                <Modal visible={showListUsersModal} animationType="slide"
                          onRequestClose={() => setShowListUsersModal(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.title}> User's list</Text>
                        </View>
                        <UserList style={styles.modalBody} />
                        <ButtonComponent title="Close" onPress={() => setShowListUsersModal(false)}/>
                    </View>
                </Modal>

                <Modal visible={showUsernameModal} animationType="slide"
                          onRequestClose={() => setShowUsernameModal(false)}
                       transparent={true}>

                    <View style={styles.modalContainer}>
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
        marginBottom: 20,
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
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "#B02F13"
    },
    modalBody: {
        flex: 1,
        width: "100%",
        padding: 10,
        backgroundColor: "#fff"
    }
});
