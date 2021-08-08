import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import RestaurantCard from './RestaurantCard'

const RestaurantList = ({ results }) => {
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
                        <RestaurantCard restaurant={item} />
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

export default RestaurantList