import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity , TextInput, Button} from 'react-native'
import Spacer from '../../components/Spacer'
import { Context as LocationContext} from '../../context/LocationContext'

const NewSearchScreen = ({ navigation }) => {
    const { state, setSearch } = useContext(LocationContext)
    const { limit, term, location } = state[0]
    const [newLocation, setNewLocation] = useState(location)
    const [newLimit, setNewLimit] = useState(limit)
    const [newTerm, setNewTerm] = useState(term)

    return (
        <View style={styles.view}>
            <Text>
                NewSearchScreen
            </Text>
            <Spacer />
            <Text>Search Location</Text>
            <TextInput
                style={styles.input}
                value={newLocation}
                onChangeText={text => setNewLocation(text)}
            />
            <Text>Number of Results</Text>
            <TextInput
                style={styles.input}
                value={newLimit.toString()}
                onChangeText={text => setNewLimit(text)}
            />
            <Text>Search Term</Text>
            <TextInput
                style={styles.input}
                value={newTerm}
                onChangeText={text => setNewTerm(text)}
            />
            <Button title="Search" onPress={() => {
                setSearch(newLocation, newLimit, newTerm)
                navigation.navigate('SearchResults')   
            }}/>
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

export default NewSearchScreen