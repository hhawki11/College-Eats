import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../../components/Spacer'

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>SettingsScreen</Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('DefaultLocationSetting')}>
                <Text>
                    Go to DefaultLocationSetting
                </Text>
            </TouchableOpacity>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('TypeRandomizerSetting')}>
                <Text>
                    Go to TypeRandomizerSetting
                </Text>
            </TouchableOpacity>
        </View>
    )
}

SettingsScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 91,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})

export default SettingsScreen