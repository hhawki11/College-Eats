import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import yelp from '../../api/yelp'
import openMap from 'react-native-open-maps'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
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

    const getStars = (starNum, linkColor) => {
        const starArr = []
        for (var i = 0; i < 5; i++) {
            if (starNum >= 1) {
                starArr.push(<FontAwesome key={i} name="star" size={18} color={linkColor} />)
            } else if (starNum > 0) {
                starArr.push(<FontAwesome key={i} name="star-half-empty" size={18} color={linkColor} />)
            } else {
                starArr.push(<FontAwesome key={i} name="star-o" size={18} color={linkColor} />)
            }
            starNum -= 1
        }
        return(starArr)
    }

    const convertTransactions = (transactions) => {
        var transString = []
        for (var i of transactions) {
            if (i == 'pickup') {
                transString.push(<MaterialIcons key={i} name="takeout-dining" size={24} color="black" />)
            } else if (i == 'delivery') {
                transString.push(<MaterialIcons key={i} name="delivery-dining" size={24} color="black" />)
            } else if (i == 'restaurant_reservation') {
                transString.push(<MaterialIcons key={i} name="restaurant" size={24} color="black" />)
            }
        }
        return transString
    }

    return (
        <View style={styles.background}>
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
                        {getStars(restaurant.rating, 'blue')}
                    </Text>
                <Text style={styles.second} onPress={() => {
                    Linking.openURL(`telprompt:${restaurant.phone}`)
                }}>
                    {<FontAwesome key='phone' name="phone" size={26} color="blue" />}
                </Text>
                <Text style={styles.second}>{restaurant.price}</Text>
            </View>
            <View style={styles.addressRow}>
                <View style={styles.fourth}>
                    <Text style={styles.second}>
                        <Octicons name="milestone" size={24} color="black" />
                        {' '}{location && restaurant ?
                        (getDistance({ latitude: location.latitude, longitude: location.longitude }, { latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude }) * .00062137).toFixed(1) :
                        null} mi
                    </Text>
                </View>

                    <View style={styles.sixth}>
                        <Text style={styles.fifth} onPress={() => {
                            openMap({ latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude, query: restaurant.name })
                        }}>
                            <MaterialIcons margin={16} name="directions-car" size={32} color="black" />
                        </Text>
                        <Text style={styles.seventh}>Directions</Text>
                    </View>
                
            </View>
            <View style={styles.rows}>
                {restaurant.hours[0].is_open_now ?
                    <Text style={styles.open}>Open</Text> : 
                    <Text style={styles.closed}>Closed</Text>
                }
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
                <Text style={styles.reviewText}>{getStars(reviews[0].rating, 'black')}</Text>
                <Text style={styles.reviewText}>{reviews[0].user.name}</Text>
                <Image style={styles.pfp} source={{ uri: reviews[0].user.image_url }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300,
        borderRadius: 12,
        margin: 6
    },
    pfp: {
        height: 50,
        width: 50,
    },
    background: {
        backgroundColor: '#2F323A',
        overflow: 'hidden',
    }, 
    spacer: {
        flex: .1
    },
    name: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        height: 50,
        fontSize: 32,
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 10,
        margin: 6,
        borderRadius: 12,
        overflow: 'hidden',
        color: '#C9C1BA'
    },
    hyperlink: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: 'blue'
    },
    open: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        color: 'green',
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden'
    },
    closed: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        color: 'red',
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden'
    },
    second: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden',
    },
    third: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: '#C9C1BA'
    },
    fourth: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        flex: .5,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden'
    },
    fifth: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        textAlign: 'center',
        fontSize: 28,
        borderRadius: 12,
        marginTop: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden',
    },
    sixth: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        textAlign: 'center',
        flex: 1,
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    seventh: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 6,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden',
    },
    reviewText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 75,
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    inforow: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 75,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#2F323A',
        overflow: 'hidden'
    },
    reviewrow: {
        borderColor: 'black',
        borderWidth: 0,
        borderStyle: 'solid',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 122,
        borderRadius: 12,
        margin: 6,
        backgroundColor: '#C9C1BA',
        overflow: 'hidden'
    },
})

RestaurantDetailsScreen.navigationOptions = () => {
    return {
        headerStyle: { backgroundColor: '#2F323A' },
    }
}

export default RestaurantDetailsScreen