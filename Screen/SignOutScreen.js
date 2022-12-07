import React, {useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { TokenContext } from '../context/Context'
import ButtonComponent from "../components/form/ButtonComponent";

export default function SignOutScreen({ navigation }) {
    const [token, setToken] = useContext(TokenContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Sign Out
            </Text>
            <ButtonComponent title="Sign Out" onPress={() => {
                setToken(null);
                navigation.navigate("SignInScreen");
            }
            }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    }
});


