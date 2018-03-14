import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'

export default class _Button extends React.Component {
    static propTypes = {
        _text: PropTypes.string,
        _onPress: PropTypes.func,
        _style: PropTypes.object,
        _textStyle: PropTypes.object,
        _icon: PropTypes.oneOf(['commend', 'share', 'deny', 'comment']),
        _renderItem: PropTypes.node,
        _iconStyle: PropTypes.object,
        _iconBtnStyle:PropTypes.object //iconBtn(包含icon及文本)样式
    }
    static defaultProps = {
        _text: 'button',
        _onPress: _ => alert('this is a button'),
        _iconStyle:{
            width:18,
            height:18,
            marginRight:6
        },
        _iconBtnStyle:{
            flexDirection:'row'
        }
    }
    constructor(props) {
        super(props)
    }
    _getImage() {
        const commendUri = '../assets/icons/commend.png'
        const denyUri = '../assets/icons/deny.png'
        const commentUri = '../assets/icons/tb_message.png'
        const shareUri = '../assets/icons/share.png'
        switch (this.props._icon) {
            case "commend":
                return <Image style={this.props._iconStyle} source={require(commendUri)}></Image>;
            case "deny":
                return <Image style={this.props._iconStyle} source={require(denyUri)}></Image>;
            case "comment":
                return <Image style={this.props._iconStyle} source={require(commentUri)}></Image>;
            case "share":
                return <Image style={this.props._iconStyle} source={require(shareUri)}></Image>;
        }
    }
    render() {
        // const Icon = this.props._icon ? this._getImage() : null
        return (
            <TouchableOpacity
                onPress={this.props._onPress}
                style={[styles.container, this.props._style]}
            >
                {this.props._renderItem ||
                    <View style={this.props._iconBtnStyle}>
                        {this.props._icon && this._getImage()}
                        <Text
                            style={this.props._textStyle}
                        >{this.props._text}</Text>
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