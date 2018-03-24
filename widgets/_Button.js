import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'

import Icon from './_Icon'

export default class _Button extends React.Component {
    static propTypes = {
        _text: PropTypes.string,
        _onPress: PropTypes.func,
        _style: PropTypes.object, //btn container style
        _textStyle: PropTypes.object,
        _renderItem: PropTypes.node,
        _icon: PropTypes.string,
        _iconSize: PropTypes.number,
        _iconColor: PropTypes.string,
        _iconBtnStyle: PropTypes.object //iconBtn(包含icon及文本)样式
    }
    static defaultProps = {
        _text: 'button',
        _onPress: _ => alert('this is a button'),
        _iconSize: 20,
        _iconBtnStyle: {
            flexDirection: 'row'
        },
        _iconColor: '#bac3d4'
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props._onPress}
                style={[styles.container, this.props._style]}
            >
                {this.props._renderItem ||
                    <View style={this.props._iconBtnStyle}>
                        {this.props._icon && <Icon name={this.props._icon} size={this.props._iconSize} color={this.props._iconColor}></Icon>}
                        { this.props._text!=="" &&<Text
                            style={this.props._textStyle}
                        >
                            {this.props._text}
                        </Text>}
                    </View>}

            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    }
})