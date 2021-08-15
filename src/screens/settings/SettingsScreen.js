import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../../components/Spacer'
import SettingLink from '../../components/SettingLink'

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>SettingsScreen</Text>
            <Spacer />
            <SettingLink 
                title='Change Default Location' 
                clicked={() => navigation.navigate('DefaultLocationSetting')} 
            />
            <Spacer />
            <SettingLink 
                title='Change Default Search Term'
                clicked={() => navigation.navigate('DefaultTermSetting')}
            />
            <Spacer />
            <SettingLink 
                title='Amount of Restaurants Shown'
                clicked={() => navigation.navigate('DefaultLimitSetting')}
            />
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