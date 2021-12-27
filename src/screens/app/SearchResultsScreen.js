import React, { useContext, useState } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Context as LocationContext} from '../../context/LocationContext'
import RestaurantList from '../../components/RestaurantList'
import Spacer from '../../components/Spacer'
import useLocation from '../../hooks/useLocation'

const SearchResultsScreen = ({ navigation }) => {
    const { state, setLocation } = useContext(LocationContext) // limit, location, term
    const { limit, term, location } = state[0]
    const [loc, setLoc] = useState(location)
    const [searchApi, results, errorMessage] = useLocation(limit, term, location)
    
    return (
        <View style={styles.view}>
            <Text>SearchResultsScreen</Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('LocationSelector')}>
                <Text>Go to LocationSelectorScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NewSearch')}>
                <Text>Change Search</Text>
            </TouchableOpacity>
            <RestaurantList results={results} />
        </View>
    )
}

SearchResultsScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 91,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center'
    }
})

export default SearchResultsScreen