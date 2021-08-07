import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DefaultLocationSettingScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>DefaultLocationSettingScreen</Text>
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

export default DefaultLocationSettingScreen