import { combineReducers } from 'redux'

import { nhReducer } from './index.neihanduanzi'
import { qsReducer } from './index.qiushibaike'


export default combineReducers({ nhReducer, qsReducer })