import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Context as LocationContext} from '../context/LocationContext'
import RestaurantCard from './RestaurantCard'

const RestaurantList = ({ results, navigation }) => {
    if (!results.length) {
        return null
    }

    return (
        <View style={styles.view}>
            <FlatList 
                vertical
                data={results}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RestaurantDetails', item)}
                        >
                            <RestaurantCard restaurant={item} />
                        </TouchableOpacity>
                    )
                }}
                showsVerticalScrollIndicator={false}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
})

export default withNavigation(RestaurantList)