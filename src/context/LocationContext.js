import React, { useReducer } from 'react'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'set_search':
            console.log(action.payload)
            return [
                {
                    limit: action.payload.limit,
                    location: action.payload.location,
                    term: action.payload.term
                }
            ]
        case 'set_location':
            console.log(action.payload)
            return [
                {
                    limit: state[0].limit,
                    location: action.payload.location,
                    term: state[0].term
                }
            ]
        case 'set_limit':
            console.log(action.payload)
            return [
                {
                    limit: action.payload.limit,
                    location: state[0].location,
                    term: state[0].term
                }
            ]
        case 'set_term':
            console.log(action.payload)
            return [
                {
                    limit: state[0].limit,
                    location: state[0].location,
                    term: action.payload.term
                }
            ]
        default:
            return state
    }
}

const setSearch = (dispatch) => {
    return (newLocation, newLimit, newTerm) => {
        dispatch({ type: 'set_search', payload: { location: newLocation, limit: newLimit, term: newTerm }})
    }
}

const setLocation = (dispatch) => {
    return (newLocation) => {
        dispatch({ type: 'set_location', payload: { location: newLocation } })
    }
}

const setDefaultLocation = (dispatch) => {
    return async (newDefaultLocation) => {
        await AsyncStorage.setItem('location', newDefaultLocation)
        dispatch({ type: 'set_location', payload: { location: newDefaultLocation }})
    }
}

const setLimit = (dispatch) => {
    return (newLimit) => {
        dispatch({ type: 'set_limit', payload: { limit: newLimit } })
    }
}

const setDefaultLimit = (dispatch) => {
    return async (newDefaultLimit) => {
        console.log('1')
        await AsyncStorage.setItem('limit', newDefaultLimit)
        console.log('2')
        dispatch({ type: 'set_limit', payload: { limit: newDefaultLimit }})
    }
}

const setTerm = (dispatch) => {
    return (newTerm) => {
        dispatch({ type: 'set_term', payload: { term: newTerm } })
    }
}

const setDefaultTerm = (dispatch) => {
    return async (newDefaultTerm) => {
        await AsyncStorage.setItem('term', newDefaultTerm)
        dispatch({ type: 'set_term', payload: { term: newDefaultTerm }})
    }
}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { setSearch, setLocation, setDefaultLocation, setLimit, setDefaultLimit, setTerm, setDefaultTerm },
    [{ limit: 4, term: 'pizza', location: 'san jose' }]
)