import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../components/Spacer'

const RestaurantSelectorScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>
                RestaurantSelectorScreen
            </Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('SearchResults')}>
                <Text>Go to SearchResultsScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

RestaurantSelectorScreen.navigationOptions = () => {
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

export default RestaurantSelectorScreen