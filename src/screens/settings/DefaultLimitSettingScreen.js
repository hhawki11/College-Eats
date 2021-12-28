import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native'
import { Context as LocationContext} from '../../context/LocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DefaultLimitSettingScreen = ({ navigation }) => {
    const { state, setDefaultLimit } = useContext(LocationContext)
    const [newLimit, setNewLimit] = useState()

    const getDefaultLimit = async () => {
        const defaultLimit = await AsyncStorage.getItem('limit')
        setNewLimit(defaultLimit)
    }
    
    if (newLimit == null) {
        getDefaultLimit()
    }

    return (
        <View style={styles.view}>
            <Text>Default Number of Results Shown:</Text>
            <TextInput
                style={styles.input}
                value={newLimit}
                onChangeText={text => setNewLimit(text)}
            />
            <Button title="Set Default Limit" onPress={() => setDefaultLimit(newLimit)} />
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

export default DefaultLimitSettingScreen