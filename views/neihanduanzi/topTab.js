import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Button from '../../widgets/_Button'
const tabData = [
    { text: '推荐', path: 'RecommandView' },
    { text: '段子', path: 'TextView' },
    { text: '图片', path: 'ImageView' },
    { text: '视频', path: 'VideoView' },

]
export default class TopTab extends React.Component {
    constructor(props) {
        super(props)
    }
    _navigate(path) {
        this.props.navigation.navigate(path)
    }
    _renderItem(item) {
        const {routeName} = this.props.navigation.state
        // console.log(item.path ,routeName)
        const textStyle = item.path === routeName ? {color:'#ff809e'}:{}
        return (
            <Button _text={item.text} _style={{borderWidth:0}} _textStyle={textStyle} _onPress={() => this._navigate(item.path)} />
        )
    }
    render() {
        return (
            <FlatList
                style={styles.container}
                horizontal={true}
                data={tabData}
                keyExtractor={(item) => item.text}
                renderItem={({ item }) => this._renderItem(item)}
            >

            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // height:80,
    }
})