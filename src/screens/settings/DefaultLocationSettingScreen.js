import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { Context as LocationContext} from '../../context/LocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DefaultLocationSettingScreen = ({ navigation }) => {
    const { state, setDefaultLocation } = useContext(LocationContext)
    const [newLocation, setNewLocation] = useState()

    const getDefaultLocation = async () => {
        const defaultLocation = await AsyncStorage.getItem('location')
        setNewLocation(defaultLocation)
    }
    
    if (newLocation == null) {
        getDefaultLocation()
    }

    return (
        <View style={styles.view}>
            <Text>DefaultLocationSettingScreen</Text>
            <TextInput
                style={styles.input}
                value={newLocation}
                onChangeText={text => setNewLocation(text)}
            />
            <Button title="Set Default Location" onPress={() => setDefaultLocation(newLocation)} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
      }
})

export default DefaultLocationSettingScreen