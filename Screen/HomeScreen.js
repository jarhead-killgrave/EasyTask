import React, {useContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {UsernameContext, TokenContext} from "../context/Context";


/**
 * Home Screen of the application
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 * @returns {JSX.Element} the component
 */
export default function HomeScreen(props) {
    const [currentUsername, setCurrentUsername] = useContext(UsernameContext);
    const [currentToken, setCurrentToken] = useContext(TokenContext);
    console.log("currentUsername value ",currentUsername);
    console.log("currentToken value ",currentToken);
        return (
            <View style={styles.container}>
                <Text>Welcome {currentUsername}</Text>
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
});
