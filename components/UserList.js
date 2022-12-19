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

    // Return the list of users
    return (
        <View style={[styles.container, props.style]}>
            <FlatList
                data={users}
                renderItem={({item}) => (
                    <Item item={{id: item.id, content: item.username}} deletableItem={item.username !== username} onItemDelete={handleDelete}/>
                )}
                keyExtractor={item => item.id}
                style={styles.list}
            />
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
    list: {
        width: '100%',
    },
});
