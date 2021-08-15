import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { navigate } from '../navigationRef'

const SettingLink = ({ title, clicked }) => {
    return (
        <TouchableOpacity onPress={() => clicked()}>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default SettingLink