import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import Spacer from '../../components/Spacer'

const LocationSelectorScreen = ({ navigation }) => {

    function printLocation() {

    }

    return (
        <View style={styles.view}>
            <Text>
                LocationSelectorScreen
            </Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails')}>
                <Text>Go to RestaurantDetailsScreen</Text>
            </TouchableOpacity>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 35.30808223880769,
                    longitude: -80.73374779583304,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                onPress={({ coordinate }) => console.log(coordinate.LatLng)}
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
    map: {
        height:300
    }
})

export default LocationSelectorScreen