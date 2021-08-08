import React from 'react'
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={() => navigation.navigate('College Eats')}>
                <Text>Welcome Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginTop: 91,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})

export default WelcomeScreen