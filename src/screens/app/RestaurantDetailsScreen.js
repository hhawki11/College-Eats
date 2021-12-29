import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import yelp from '../../api/yelp'
import openMap from 'react-native-open-maps'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'

const RestaurantDetailsScreen = ({ navigation }) => {
    const [restaurant, setRestaurant] = useState(null)
    const [location, setLocation] = useState(null)
    const [reviews, setReviews] = useState([{user: {}, }])
    const id = navigation.getParam('id')

    const getLocation = async () => {
        const userLocation = await Location.getCurrentPositionAsync()
        setLocation(userLocation.coords)
    }

    const getRestaurant = async (id) => {
        const response = await yelp.get(`/${id}`)
        const reviewList = await yelp.get(`/${id}/reviews`)
        setRestaurant(response.data)
        setReviews(reviewList.data.reviews)
    }

    useEffect(() => {
        getRestaurant(id)
        getLocation()
    }, [])

    if (!restaurant) {
        return null
    }

    const getStars = (starNum) => {
        const starArr = []
        for (var i = 0; i < 5; i++) {
            if (starNum >= 1) {
                starArr.push(<FontAwesome key={i} name="star" size={18} color="black" />)
            } else if (starNum > 0) {
                starArr.push(<FontAwesome key={i} name="star-half-empty" size={18} color="black" />)
            } else {
                starArr.push(<FontAwesome key={i} name="star-o" size={18} color="black" />)
            }
            starNum -= 1
        }
        return(starArr)
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
                <Text style={styles.second} onPress={() => {
                    Linking.openURL(restaurant.messaging.url)
                }}>
                    {getStars(restaurant.rating)}
                </Text>
                <Text style={styles.second} onPress={() => {
                    Linking.openURL(`telprompt:${restaurant.phone}`)
                }}>
                    {<FontAwesome key='phone' name="phone" size={26} color="black" />}
                </Text>
                <Text style={styles.second}>{restaurant.price}</Text>
            </View>
            <View style={styles.rows}>
                <Text style={styles.second}>
                    {location && restaurant ?
                    (getDistance({ latitude: location.latitude, longitude: location.longitude }, { latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude }) * .00062137).toFixed(1) :
                    null} Miles away
                </Text>
                <Text style={styles.second} onPress={() => {
                    openMap({ latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude, query: restaurant.name })
                }}>
                    <MaterialIcons name="directions-car" size={26} color="black" />
                </Text>
            </View>
            <View style={styles.rows}>
                <Text style={styles.second}>{restaurant.hours[0].is_open_now ? 'Open' : 'Closed'}</Text>
                <Text style={styles.second}>{convertTransactions(restaurant.transactions)}</Text>
            </View>
            <View style={styles.inforow}>
                <Text style={styles.third}>{restaurant.location.display_address}</Text>
                <Text style={styles.third}>{restaurant.display_phone}</Text>
                <Text style={styles.hyperlink} onPress={() => {
                    Linking.openURL(restaurant.url);
                }}>
                    {restaurant.name}
                </Text>
            </View>
            <View style={styles.reviewrow}>
                <Text style={styles.reviewText} onPress={() => {
                    Linking.openURL(reviews[0].url)
                }}>
                    {reviews[0].text}
                </Text>
                <Text style={styles.reviewText}>{getStars(reviews[0].rating)}</Text>
                <Text style={styles.reviewText}>{reviews[0].user.name}</Text>
                <Image style={styles.pfp} source={{ uri: reviews[0].user.image_url }}/>
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
        height: 100,
        width: 100,
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
        alignItems: 'center',
        paddingTop: 6
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
        fontSize: 18,
        paddingTop: 12
    },
    third: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
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