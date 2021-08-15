import React, { useReducer } from 'react'
import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'set_location':
            console.log(action.payload)
            return [
                {
                    limit: state[0].limit,
                    location: action.payload.location,
                    term: state[0].term
                }
            ]
        default:
            return state
    }
}

const setLocation = (dispatch) => {
    return (newLocation) => {
        dispatch({ type: 'set_location', payload: { location: newLocation } })
    }
}

const setDefaultLocation = (dispatch) => {}

const setDefaultLimit = (dispatch) => {}

const setDefaultTerm = (dispatch) => {}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { setLocation, setDefaultLocation },
    [{ limit: 4, term: 'pizza', location: 'san jose' }]
)