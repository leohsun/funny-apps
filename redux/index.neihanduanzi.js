
import { applyMiddleware } from 'redux'
// reducer

const NH_GET_TEXT_LIST = 'getTextList'
const ADD = 'ADD'

const initState = {
    text_listData: [6],
    num: 0
}

export function nhReducer(state = initState, action) {
    switch (action.type) {
        case NH_GET_TEXT_LIST:
            return state.text_listData = action.payload.concat(state.text_listData);
        case ADD:
            return { ...state, num: ++state.num }
        default:
            return state
    }
}

// action creator

export function getTextList() {
    return (dispatch) => {
        dispatch({
            type: NH_GET_TEXT_LIST,
            payload: ['new by getTextList']
        })
    }
}

export function addNum() {
    console.log({type:ADD})
    return { type: ADD }
}