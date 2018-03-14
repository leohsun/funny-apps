import React from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { $http } from '../../utils'
import Panel from './panel'

export default class TextView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            refreshing: false
        }
        this._onRefresh = this._onRefresh.bind(this)
    }
    componentDidMount() {
        this._onRefresh()
        
    }
   
    _renderItem({ item }) {
        // console.log(item)
        const group = item.group
        const comments = item.comments
        return <Panel
            _data={group}
            _hotComments={comments}
        />
    }
    _keyExtractor({ group }) {
        return group.group_id
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        })
        $http.get('http://lf.snssdk.com/neihan/stream/mix/v1/?content_type=-102')
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    refreshing: false
                })

                // console.log(this.tate.data, res.data.data)
                this.setState({ data: res.data.data.concat(this.state.data) })
            })
            .catch(err => {
                alert(err)
            })

    }

    render() {
        return (
            <FlatList sytle={styles.screen}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['#ff819f']}
                        title="title"
                    />
                }
            // onEndReached = {this._onEndReached}
            />

        )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})