import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const RestaurantDetailsScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>RestaurantDetailsScreen</Text>
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

export default RestaurantDetailsScreen