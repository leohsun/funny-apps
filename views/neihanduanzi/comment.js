import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Button from '../../widgets/_Button'
import AvatarNickname from './avatar-nickname'
export default class Comment extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={this.props._commentStyle}>
                <View style={styles.header}>
                    <AvatarNickname
                        _avatar={this.props._avatar}
                        _nickname={this.props._nickname}
                        _avatarNicknameStyle={{flex:1}}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.commendIconBtn)}
                        _icon='commend'
                        _iconStyle={StyleSheet.flatten(styles.iconStyle)}
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._digg_count}`}
                    />
                </View>
                <Text style={styles.comment}>{this.props._comment}</Text>
            </View>)
    }
}

const styles = StyleSheet.create({

    
    header:{
        flexDirection:'row',
    },
    commendIconBtn: {
        borderWidth: 0,
    },
    iconStyle: {
        width: 18,
        height: 18,
        marginRight: 6,
        tintColor: '#ccc'
    }
})