import React from 'react'
import { View, Text } from 'react-native'
import { StackNavigator, addNavigationHelpers, } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import Thunk from 'redux-thunk'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// views
import TextView from './text'
import ImageView from './image'
import VideoView from './video'
import RecommandView from './recommand'





// 内涵
import { nhReducer } from '../../redux/index.neihanduanzi'
import TopTab from './topTab'
const NHStackNavigator = StackNavigator(
    {
        RecommandView: { screen: RecommandView },
        TextView: { screen: TextView },
        ImageView: { screen: ImageView },
        VideoView: { screen: VideoView }
    },
    {
        initialRouteName: "ImageView",
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: <TopTab navigation={navigation} />,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }
        },
        headerMode: "float",
        // headerTransitionPreset:'uikit'
    }
)
const initSate = NHStackNavigator.router.getStateForAction(NHStackNavigator.router.getActionForPathAndParams('RecommandView'));
const navigatorReducer = (state = initSate, action) => {
    const nextState = NHStackNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

const reducerIntegration = combineReducers({ nhReducer, navigatorReducer })
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.navigatorReducer,
);
const addListener = createReduxBoundAddListener("root");

class NH extends React.Component {
    render() {
        return (
            <NHStackNavigator 
            navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigatorReducer,
                addListener,
            })}
            screenProps = {this.props.nhReducer}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state }

}
const NH_widthNavigationState = connect(mapStateToProps)(NH)
const store = createStore(reducerIntegration, applyMiddleware(middleware,Thunk))

export default class NH_root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NH_widthNavigationState></NH_widthNavigationState>
            </Provider>
        )
    }

}


