import React from 'react'
import { View, Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { addNum } from '../../redux/index.neihanduanzi'

export default class RecommandView extends React.Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }
    _onPress() {
        this.props.navigation.dispatch({type:'ADD'})
        console.log(this.props)
    }
    render() {
        const { screenProps } = this.props
        return (
            <View>
                <Text
                    onPress={this._onPress}
                >{this.props.screenProps.num}</Text>
            </View>
        )
    }
}