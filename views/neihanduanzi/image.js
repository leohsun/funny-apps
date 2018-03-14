import React from 'react'
import { View, Text, TextInput, AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'

export default class ImageView extends React.Component {
    _save(){
        alert('save')
    }
    _remove(){
        alert('remove')
    }
    _tackout(){
        alert('tackout')
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ height: 40 }}
                    underlineColorAndroid="#ff819f"
                />
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text onPress={()=>this._save()}>保存</Text>
                    <Text onPress={()=>this._remove()}>移除</Text>
                    <Text onPress={()=>this._tackout()}>取出</Text>
                </View>
            </View>
        )
    }
}