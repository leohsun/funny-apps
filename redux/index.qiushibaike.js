const QS_GET_BAOSHE_DATA = 'QS_GET_BAOSHE_DATA '

const initState = {
    baoshe:[]
}

export function qsReducer(state=initState,action){
    switch(action.type){
        case QS_GET_BAOSHE_DATA:
        return state.baoshe = action.paylod.concat(state.baoshe)
        default:
         return state
    }
}