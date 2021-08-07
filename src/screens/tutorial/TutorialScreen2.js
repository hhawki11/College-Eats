import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../../components/Spacer'

const TutorialScreen2 = ({ navigation }) => {
    return (
        <View style={styles.view}>
        <Text>Tutorial Screen 2</Text>
        <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('Tutorial3')}>
                <Text>
                    Go to tutorial screen 3
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})

export default TutorialScreen2