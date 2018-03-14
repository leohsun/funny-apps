import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'


import Button from '../../widgets/_Button'

export default class AvatarNickname extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const User = <View style={styles.user}><Image source={{ uri: this.props._avatar }} style={styles.avatar} /><Text style={styles.nickname}>{this.props._nickname}</Text></View>        
        return(
            <Button
                    _style={{...StyleSheet.flatten(styles.container),...this.props._avatarNicknameStyle}}
                    _renderItem={User}
                />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderWidth: 0,
        height: 30,
        marginBottom: 8,
    },
    user: {
        width: "100%",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        marginRight: 12,
        borderRadius: 15
    },
    nickname:{
        lineHeight: 30,
        height: 30,
    }
})