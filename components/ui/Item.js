import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Switch, TouchableOpacity, Image} from "react-native";


/**
 * The item component
 * @param props the properties of the component
 */
export default function Item(props =
                                 {item: {id: -1, content: ""}, checkable: false, checked: false,
                                     _onCheck: () => {}, destructible: false, _onDelete: () => {}, clickable: false, _onPress: () => {}}) {
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

    // Press the item
    const onPress = () => {
        props._onPress(props.item.id);
    }

    return (
        <View style={styles.item}>
            {props.checkable &&
                <Switch value={checked} onValueChange={onCheck}/>}
            {props.clickable &&
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.text}>
                        {props.item.content}</Text>
                </TouchableOpacity>
            }
            {!props.clickable &&
                <Text style={styles.text}>
                    {props.item.content}
                </Text>
            }
            {props.destructible &&
                <TouchableOpacity style={styles.button} onPress={onDelete}>
                    <Image source={require('../../assets/trash.png')} style={styles.image}/>
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
