import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const RestaurantCard = ({ restaurant }) => {
    return (
        <View style={styles.view}>
            <Text>
                {restaurant.name}
            </Text>
            <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 30
    },
    view: {
        alignItems: 'center'
    }
})

export default RestaurantCard