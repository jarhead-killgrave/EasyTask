import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import Icon from "../components/ui/Icon";
import TodoLists from "../components/TodoLists";


/**
 * The screen that displays the list of todoLists
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 */
export default function TodoListsScreen(props) {

    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTitle: "To-Do Lists",
            headerStyle: {
                backgroundColor: "#008080",
            },
            headerTintColor: "#fff",
            headerRight: () => (
                <Icon
                    name="share"
                    onPress={() => {
                        console.log("partager")
                    }
                    }
                    pressable={true}
                    size={30}
                />
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <TodoLists />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
});

