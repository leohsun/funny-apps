import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TabNavigator, addNavigationHelpers } from 'react-navigation'

import { createStore, applyMiddleware, combineReducers } from 'redux'



// 内涵
import Neihanduanzi from './views/neihanduanzi'


export default AppNavigator = TabNavigator(
  {
    "段子": { screen: Neihanduanzi },
    "糗事": { screen: Neihanduanzi },
  }, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state
      return ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let icon
          if (routeName === '段子') {
            icon = require('./assets/icons/joke.png')
          } else if (routeName === '糗事') {
            icon = require('./assets/icons/shit.png')
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          let activeStyle = focused ? { tintColor: '#ff809e' } : {}
          return <Image source={icon} style={[{ width: 24, height: 24 }, activeStyle]} />;
        },

      })
    },
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#ff809e',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        display: 'none'
      },
      tabStyle: {
        // backgroundColor:'red',
        height: 58,
        justifyContent: 'center',
        alignItems: 'center'
      },
      labelStyle: {
        fontSize: 10,
        height: 12,
        // backgroundColor:'#fff'
      },
      iconStyle: {
        height: 26,
        // backgroundColor:"#fff"
      },
      style: {
        backgroundColor: 'transparent',
        height: 58,
        margin: 0
      },

    },
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
)


