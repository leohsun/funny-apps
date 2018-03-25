import React from 'react'
import {
    View,
    Modal,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    NativeModules
} from 'react-native'
import Video from 'react-native-video'
import RNFB from 'react-native-fetch-blob'
import { checkFileExists, createDir } from '../../utils/'

import _Image from '../../widgets/_Image'

import Gesture from '../../widgets/_gesture'
import Button from '../../widgets/_Button'
import Comment from './comment'
import AvatarNickname from './avatar-nickname'
import VideoCom from './videoCom'



export default class Panel extends React.Component {
    constructor() {
        super(...arguments)
    }
    state = {
        modalVisible: false,
        imgLoading: false,
        imgLoadErr: false,
        imgLoad: false,
        imageExt: '',
        imageName: '',
        cachePath: ''
    };

    setModalVisible(visiable) {
        this.setState({ modalVisible: visiable });
    }


    async saveImage() {
        try {
            const { DocumentDir } = RNFB.fs.dirs
            const destDir = DocumentDir + '/funyApp/savedFiles/image'
            const fullPath = destDir + `/${this.state.imageName}`
            const isExists = await checkFileExists(fullPath)
            
            if (isExists) {
                return alert('文件已存在:' + fullPath)
            }
            const createdDir = await createDir('image')
            console.log(this.state.cachePath,'cachepath',)
            console.log(createdDir,`createdpath-${this.state.imageName}-${this.state.imageExt}`)
            if (createdDir) {
                const targetPath = createdDir +`/${this.state.imageName}.${this.state.imageExt}`
                const isSaved = await checkFileExists(targetPath)
                if(isSaved) return alert('图片已存在于:'+ targetPath)
                RNFB.fs.cp(this.state.cachePath, targetPath)
                .then(res=>{
                    // RNFB.fs.scanFile(createdPath) //scan files
                    alert(`保存成功!路径:${targetPath}`)
                })
                .catch(err=>console.error(err))
            }
        } catch (err) {
            alert(err)
        }
    }
    showLargeImage() {
        this.setState({ modalVisible: true })
    }
    saveCache(cache) {
        if (typeof cache !== 'object') return
        const { path, extension, fileName } = cache
        this.setState({
            imageExt: extension,
            cachePath: path,
            imageName: fileName
        })

    }
    ImageCom() {
        const { large_image } = this.props._data
        const { width } = Dimensions.get('window')
        const ratio = large_image.width / large_image.height
        const height = parseInt(width / ratio)

        return (
            <View style={styles.imgContainer}>
                <_Image
                    source={large_image.url_list[0].url}
                    style={{ width: width - 32, height }}
                    onLoadStart={_ => this.setState({ imgLoading: true, imgLoad: false, imageLoadErr: false })}
                    onLoad={_ => this.setState({ imgLoad: true, imgLoading: false, imageLoadErr: false })}
                    onError={_ => this.setState({ imgLoadErr: true, imgLoad: false })}
                    getCache={cache => this.saveCache(cache)}
                />
                {/* 加载提示 */}
                {this.state.imgLoading && <Text style={styles.imgLoadTips}>图片加载中...</Text>}
                {this.state.imgLoadErr && <Text style={styles.imgLoadTips}>图片加载失败...</Text>}

                {/* 长图 */}
                {height > 300 && this.state.imgLoad && <Text
                    style={styles.viewLongImageBtn}
                    onPress={_ => this.showLargeImage()}
                >
                    点击查看长图
                </Text>}

                <Modal
                    style={styles.fullModal}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View style={styles.modalToolbar}>
                        <Button
                            _text="返回"
                            _textStyle={{ color: '#ff819f' }}
                            _icon="arrowleft"
                            _iconColor="#ff819f"
                            _style={{ borderWidth: 0 }}
                            _onPress={_ => this.setState({ modalVisible: false })}
                        />
                        <Button
                            _text="保存"
                            _textStyle={{ color: '#ff819f' }}
                            _icon="shoucang"
                            _iconColor="#ff819f"
                            _style={{ borderWidth: 0 }}
                            _onPress={_ => this.saveImage()}
                        />

                    </View>
                    <Gesture
                        ratio={ratio}
                        renderItem={
                            props => (
                                <Image
                                    source={{ uri: this.state.cachePath }}
                                    {...props}
                                />
                            )
                        }
                    />
                </Modal>

            </View>
        )
    }


    HotComments() {
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentTag}>神评论</Text>
                {this.props._hotComments.map(item => {
                    return (
                        <Comment
                            key={item.id}
                            _avatar={item.avatar_url}
                            _nickname={item.user_name}
                            _comment={item.text}
                            _commentStyle={StyleSheet.flatten(styles.commentStyle)}
                            _digg_count={item.digg_count}
                        />
                    )
                })}
            </View>
        )
    }

    render() {
        const { user } = this.props._data
        return (
            <View style={styles.panel}>
                <AvatarNickname
                    _avatar={user.avatar_url}
                    _nickname={user.name}
                // _avatarNicknameStyle={}
                />
                <Text style={styles.description}>{this.props._data.content}</Text>
                {this.props._type === 'image' && this.ImageCom()}
                {this.props._type === 'video' && <VideoCom _data={this.props._data}></VideoCom>}

                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>{this.props._data.category_name}</Text>
                </View>

                {this.props._hotComments.length > 0 && this.HotComments()}
                <View style={styles.iconBar}>
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='commend'
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.digg_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='deny'
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.bury_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='comment'
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.comment_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='share'
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.share_count}`}
                    />
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fdfdfd',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    userBtn: {
        width: '100%',
        borderWidth: 0,
        height: 30,
        marginBottom: 8,
    },


    description: {
        width: "100%",
        borderWidth: 0,
        height: 'auto',
        fontSize: 14,
        lineHeight: 22
    },
    tagContainer: {
        alignItems: 'flex-start'
    },
    tag: {
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#5e96b4',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 8,
        marginTop: 8,
        color: '#5e96b4',
        fontSize: 12,
        lineHeight: 20,

    },


    commentContainer: {
        marginBottom: 16
    },
    commentStyle: {
        backgroundColor: '#f8f8f8',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 18
    },
    commentTag: {
        width: 58,
        height: 20,
        lineHeight: 20,
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#ff819f',
        textAlign: 'center',

    },

    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    iconBtn: {
        borderWidth: 0,
    },
    imgContainer: {
        position: 'relative',
        width: '100%',
        maxHeight: 600,
        overflow: 'hidden',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    imgLoadTips: {
        position: 'absolute',
        width: 100,
        left: '50%',
        top: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        color: '#ff819f'
    },
    viewLongImageBtn: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    fullModal: {
        position: 'absolute'
    },
    modalToolbar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.6)',
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        height: 30,
        justifyContent: 'space-between'
    }
})