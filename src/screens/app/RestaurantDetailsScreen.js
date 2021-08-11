import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import yelp from '../../api/yelp'

const RestaurantDetailsScreen = ({ navigation }) => {
    const [restaurant, setRestaurant] = useState(null)
    const id = navigation.getParam('id')

    const getRestaurant = async (id) => {
        const response = await yelp.get(`/${id}`)
        setRestaurant(response.data)
    }

    useEffect(() => {
        getRestaurant(id)
    }, [])

    if (!restaurant) {
        return null
    }

    return (
        <View style={styles.view}>
            <Text>{restaurant.name}</Text>
            <FlatList 
                vertical
                data={restaurant.photos}
                keyExtractor={(photo) => photo}
                renderItem={({item}) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300
    },
    view: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})

export default RestaurantDetailsScreen