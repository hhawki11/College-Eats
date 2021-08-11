import React, { useReducer } from 'react'
import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const setLocation = (dispatch) => {}

const setDefaultLocation = (dispatch) => {}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { setLocation, setDefaultLocation },
    [{ limit: 50, term: '', location: 'san jose' }]
)