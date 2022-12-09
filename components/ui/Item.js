import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Switch, TouchableOpacity} from "react-native";


/**
 * The item component
 * @param props the properties of the component
 */
export default function Item(props =
                                 {item: {id: -1, content: ""}, checkable: false, checked: false,
                                     _onCheck: () => {}, destructible: false, _onDelete: () => {}}) {
    const [checked, setChecked] = useState(props.checked);

    // Update the checked state when the props change
    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked]);

    // Update the checked state when the switch is toggled
    const onCheck = () => {
        setChecked(!checked);
        props._onCheck(props.item.id, !checked);
    }

    // Delete the item
    const onDelete = () => {
        props._onDelete(props.item.id);
    }

    return (
        <View style={styles.container}>
            {props.checkable &&
                <Switch
                    trackColor={{false: "#767577", true: "#81b0ff"}}
                    thumbColor={checked ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onCheck}
                    value={checked}
                    style={styles.switch}
                />
            }
            <Text
                style={checked ? styles.done : styles.todo}
            >{props.item.content}</Text>
            {props.destructible &&
                <TouchableOpacity
                    style={styles.button}
                    onPress={onDelete}
                >
                    <Image
                        style={styles.image}
                        source={require('../../assets/trash.png')}
                    />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: '2%',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        marginBottom: 10,
        shadowOffset: {width: 0, height: 2},
        shadowColor: "black",
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: "white"

    },
    switch: {
        transform: [{scaleX: 0.8}, {scaleY: 0.8}]
    },
    done: {
        textDecorationLine: "line-through",
        color: "#ccc"
    },
    todo: {
        color: "#000"
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 20,
        height: 20
    }
});
