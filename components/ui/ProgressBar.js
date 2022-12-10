import { StyleSheet, View, Text, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function ProgressBar(props={progress: 0}) {

    const percentage = props.progress * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Progress: {percentage.toFixed(0)}%</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressBar: {
        width: 300,
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#008080',
    },
    // Media queries
    '@media (max-width: 600px)': {
        progressBar: {
            width: screenWidth * 0.6,
        },
    },
    '@media (min-width: 600px) and (max-width: 800px)': {
        progressBar: {
            width: screenWidth * 0.8,
        },
    },
    '@media (min-width: 800px)': {
        progressBar: {
            width: screenWidth * 0.9,
        },
    },
});
