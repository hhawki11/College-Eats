import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Spacer from '../../components/Spacer'

const TutorialScreen1 = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text>Tutorial Screen 1</Text>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('Tutorial2')}>
                <Text>
                    Go to tutorial screen 2
                </Text>
            </TouchableOpacity>
        </View>
    )
}

TutorialScreen1.navigationOptions = () => {
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

export default TutorialScreen1