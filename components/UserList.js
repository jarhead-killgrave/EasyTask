import React, {useState, useContext, useEffect} from "react";
import {deleteUser, getUsers} from "../api/crudUser";
import {TokenContext, UsernameContext} from "../context/Context";
import {FlatList, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import ButtonComponent from "./ui/ButtonComponent";
import Item from "./ui/Item";
import Field from "./ui/Field";


export  function UserList(props){

    // Store the users in the state
    const [users, setUsers] = useState([]);

    // Store the user id of the user that is currently being edited
    const [editingUserId, setEditingUserId] = useState(null);

    // Store the role of the user that is currently being edited
    const [editingUsername, setEditingUsername] = useState(null);

    const [token,] = useContext(TokenContext);
    const [username,] = useContext(UsernameContext);

    // Update the users in the state when the component is mounted
    useEffect(() => {
        getUsers(token).then((users) => {
            setUsers(users);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    // Called when the user clicks on the delete button
    const handleDelete = (userId) => {
        // Delete the user
        deleteUser(userId, token).then((nodeDeleted) => {

            // If the user was deleted, update the users in the state
            if(nodeDeleted > 0){
                const newUsers = users.filter((user) => user.id !== userId);
                setUsers(newUsers);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    // Called when the user clicks on the edit button(press an user)
    const handleEdit = (userId, username) => {
        setEditingUserId(userId);
        setEditingUsername(username);
    }

    // Called when the user clicks on the cancel button
    const handleCancel = () => {
        setEditingUserId(null);
        setEditingUsername(null);
    }

    // Called when the user clicks on the save button
    const handleSave = () => {

    }

    // Return the list of users
    return (
        <View style={[styles.container, props.style]}>
            <FlatList
                data={users}
                renderItem={({item}) => (
                    <Item item={{id: item.id, content: item.username}} deletableItem={item.username !== username} pressableItem={item.username !== username}
                          onItemDelete={handleDelete}  onItemPress={handleEdit}/>
                )}
                keyExtractor={item => item.id}
                style={styles.list}
            />

        <Modal style={styles.modal} visible={editingUserId !== null} onRequestClose={() => {
            setEditingUserId(null);
            setEditingUsername(null);
        }}>
            <View style={styles.modalContainer}>
                    <Text style={styles.title}>Edit user</Text>
                    <Text style={styles.text}>Username: {editingUsername}</Text>
                    <Text style={styles.text}>Roles(user or admin):</Text>
                    <Field style={styles.field} placeholder="admin or user" value={""} onChangeText={setEditingUsername}/>
                    <ButtonComponent title="Cancel" onPress={handleCancel}/>
                    <ButtonComponent title="Save" onPress={handleSave}/>
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
    modal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
    },
    picker: {
        width: 200,
        height: 50,
    },
    list: {
        width: '100%',
    },


});
