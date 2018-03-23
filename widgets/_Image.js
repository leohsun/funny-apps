import React from 'react'
import { View, Image, Text, Platform } from 'react-native'

import RNFB from 'react-native-fetch-blob'
import PropTypes from 'prop-types'


// 需申请 READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE 权限

// 通过_getCacheInfo事件回传当前文件的缓存路径及 后缀

export default class _Image extends React.Component {
    constructor() {
        super(...arguments)

    }
    state = {
        localPath: '', //缓存文件 无后缀
        extension:''  //通过 response header contentType 拿的后缀
    }
    static propTypes = {
        _source: PropTypes.string.isRequired,  //url地址
        _getLocalPath: PropTypes.func   //用于取本地cacha的路径
    }

    downFile() {
        RNFB.config({
            fileCache: true,
        }).fetch('GET', this.props._source)
            .then(res => {
                const mimeArr = res.respInfo.headers['Content-Type'].split('/')
                const categroy = mimeArr[0]
                const extension = mimeArr[1]
                const localPath = (Platform.OS === 'android' ? 'file://' : '') + res.path()
                this.setState({ localPath,extension })
            }).catch(err => {
                alert(err)
                return false
            })
    }
    componentDidMount() {
        this.downFile()
    }
    passCache(e){
        let cache = {
            path:this.state.localPath,
            extension:this.state.extension
        }
        this.props._getCache && this.props._getCache(cache)
    }
    render() {
        return (
            <View>
                {this.state.localPath ? <Image source={{uri:this.state.localPath}} onLoad={_=>this.passCache(_)}  style={{ width: this.props._width, height: this.props._height }} /> : null}
            </View>
        )
    }
}
