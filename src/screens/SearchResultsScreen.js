import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../components/Spacer'

const SearchResultsScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>SearchResultsScreen</Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails')}>
                <Text>Go to RestaurantDetailsScreen</Text>
            </TouchableOpacity>
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

export default SearchResultsScreen