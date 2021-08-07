import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Spacer from '../../components/Spacer'

const TutorialScreen3 = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>
                TutorialScreen3
            </Text>
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

export default TutorialScreen3