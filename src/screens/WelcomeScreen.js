import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native'
import { Context as LocationContext} from '../context/LocationContext'

const WelcomeScreen = ({ navigation }) => {
    const { state, setLocation, setDefaultLocation, setLimit, setDefaultLimit, setTerm, setDefaultTerm } = useContext(LocationContext) // limit, location, term

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={async () => {
                    const defaultLocation = await AsyncStorage.getItem('location')
                    const defaultLimit = await AsyncStorage.getItem('limit')
                    const defaultTerm = await AsyncStorage.getItem('term')
                    //TODO ask to set default location to user's location
                    defaultLocation ? setLocation(defaultLocation) : setDefaultLocation('san jose') 
                    defaultLimit ? setLimit(defaultLimit) : setDefaultLimit('4')
                    defaultTerm ? setTerm(defaultTerm) : setDefaultTerm('pizza')
                    navigation.navigate('College Eats')
                }}
            >
                <Text>Welcome Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginTop: 91,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})

export default WelcomeScreen