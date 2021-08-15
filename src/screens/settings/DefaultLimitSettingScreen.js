import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DefaultLimitSettingScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>DefaultLimitSettingScreen</Text>
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

export default DefaultLimitSettingScreen