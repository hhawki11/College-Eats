import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Linking } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import yelp from '../../api/yelp'

const RestaurantDetailsScreen = ({ navigation }) => {
    const [restaurant, setRestaurant] = useState(null)
    const [reviews, setReviews] = useState([{user: {}, }])
    const id = navigation.getParam('id')

    const getRestaurant = async (id) => {
        const response = await yelp.get(`/${id}`)
        const reviewList = await yelp.get(`/${id}/reviews`)
        setRestaurant(response.data)
        setReviews(reviewList.data.reviews)
    }

    useEffect(() => {
        getRestaurant(id)
    }, [])

    if (!restaurant) {
        return null
    }

    const convertTransactions = (transactions) => {
        var transString = []
        for (var i of transactions) {
            if (i == 'pickup') {
                transString.push('Pickup')
            } else if (i == 'delivery') {
                transString.push('Delivery')
            } else if (i == 'restaurant_reservation') {
                transString.push('Restaurant Reservation')
            }
        }
        return transString
    }

    return (
        <View style={styles.view}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <FlatList 
                horizontal
                data={restaurant.photos}
                keyExtractor={(photo) => photo}
                renderItem={({item}) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
            <View style={styles.rows}>
                <Text style={styles.second}>{restaurant.rating} Stars</Text>
                <Text style={styles.second}>{restaurant.phone}</Text>
                <Text style={styles.second}>{restaurant.price}</Text>
            </View>
            <View style={styles.rows}>
                <Text style={styles.second}>Distance from user</Text>
                <Text style={styles.second}>{restaurant.coordinates.latitude}          {restaurant.coordinates.longitude}</Text>
            </View>
            <View style={styles.rows}>
                <Text style={styles.second}>{restaurant.hours[0].is_open_now ? 'Open' : 'Closed'}</Text>

                <Text style={styles.second}>{convertTransactions(restaurant.transactions)}</Text>
            </View>
            <View style={styles.inforow}>
                <Text style={styles.second}>{restaurant.location.display_address}</Text>
                <Text style={styles.second}>{restaurant.display_phone}</Text>
                <Text style={styles.hyperlink} onPress={() => {
                    Linking.openURL(restaurant.url);
                }}>
                    {restaurant.name}
                </Text>
            </View>
            <View style={styles.reviewrow}>
                <Text style={styles.reviewText}>{reviews[0].text}</Text>
                <Text style={styles.reviewText}>{reviews[0].rating}</Text>
                <Text style={styles.reviewText}>{reviews[0].user.name}</Text>
                <Image style={styles.pfp} source={{ uri: reviews[0].user.image_url }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300
    },
    pfp: {
        height: 50,
        width: 50,
    }, 
    view: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    name: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        height: 50,
        fontSize: 24,
        textAlign: 'center',
        alignItems: 'center'
    },
    hyperlink: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: 'blue'
    },
    second: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 1,
        textAlign: 'center',
        fontSize: 18
    },
    reviewText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    inforow: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 75,
    },
    reviewrow: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 150,
    },
})

export default RestaurantDetailsScreen