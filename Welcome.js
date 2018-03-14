import React from 'react'
import { View, Text } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

import App from './App'

class Welcome extends React.Component {
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        this.timer = setTimeout(_ => {
            this.props.navigation.navigate('App')
        }, 500)
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>welcome page</Text>
            </View>
        )
    }
}

export default SwitchNavigator(
    {
        Welcome: { screen: Welcome },
        App: { screen: App }
    }, {
        initialRouteName: 'Welcome',
    }
)