import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Context as LocationContext} from '../../context/LocationContext'

const DefaultLocationSettingScreen = ({ navigation }) => {
    const { state, setLocation } = useContext(LocationContext)

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