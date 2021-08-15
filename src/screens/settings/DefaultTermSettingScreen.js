import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DefaultTermSettingScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>DefaultTermSettingScreen</Text>
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

export default DefaultTermSettingScreen