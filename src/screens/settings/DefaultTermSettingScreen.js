import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { Context as LocationContext} from '../../context/LocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DefaultTermSettingScreen = ({ navigation }) => {
    const { state, setDefaultTerm } = useContext(LocationContext)
    const [newTerm, setNewTerm] = useState()

    const getDefaultTerm = async () => {
        const defaultTerm = await AsyncStorage.getItem('term')
        setNewTerm(defaultTerm)
    }
    
    if (newTerm == null) {
        getDefaultTerm()
    }

    return (
        <View style={styles.view}>
            <Text>DefaultTermSettingScreen</Text>
            <TextInput
                style={styles.input}
                value={newTerm}
                onChangeText={text => setNewTerm(text)}
            />
            <Button title="Set Default Term" onPress={() => setDefaultTerm(newTerm)} />
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

export default DefaultTermSettingScreen