import React, {useContext, useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {UsernameContext} from "../context/Context";


/**
 * Home Screen of the application
 *
 * @param props the properties of the component
 * @constructor the constructor of the component
 * @returns {JSX.Element} the component
 */
export default function HomeScreen(props) {
    const [currentUsername,] = useContext(UsernameContext);

    useEffect(() => {
        props.navigation.setOptions({
            title: "Welcome " + currentUsername,
            headerStyle: {
                backgroundColor: '#B02F13',
            },
            headerTintColor: '#fff',
        });
    }, [currentUsername]);


    return (
            <View style={styles.container}>
                <Text>Welcome to EasyTask, {currentUsername}! With this tool, you can easily manage your tasks.
                    organize and track your tasks, set deadlines and reminders. Some of our key features include:
                </Text>
                <View style={styles.features}>
                    <Text style={styles.bulletPoint}>- Create and manage multiple task lists</Text>
                    <Text style={styles.bulletPoint}>- Create and manage multiple tasks</Text>
                    <Text style={styles.bulletPoint}>- Track your progress</Text>
                    <Text style={styles.bulletPoint}>- Use tags and filters to quickly find and organize your tasks</Text>
                    <Text style={styles.bulletPoint}>- Share your tasks with your team, colleagues or friends</Text>
                </View>
                <Text>
                    Whether you're a busy professional, a student, or a home organizer, our task management application
                    can help you stay on top of your to-do list and get more done
                </Text>
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
    features: {
        margin: 10,
    },
    bulletPoint: {
        margin: 5,
    }
});
