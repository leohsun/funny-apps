import React from 'react'
import { View, Modal, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'


import Button from '../../widgets/_Button'
import Comment from './comment'
import AvatarNickname from './avatar-nickname'


export default class Panel extends React.Component {
    constructor(props) {
        super(props)
        // this.ImageCom = this.ImageCom.bind(this)
        // this.HotComments = this.HotComments.bind(this)
        
    }
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    loadingImageStart() {
        console.log(arguments, 'loading')
    }
    ImageCom() {
        const { large_image } = this.props._data
        const { width } = Dimensions.get('window')
        const ratio = large_image.width / large_image.height
        const height = parseInt(width / ratio)

        return (
            <View style={styles.imgContainer}>
                <Image
                    onLoadStart={this.loadingImageStart()}
                    source={{ uri: large_image.url_list[0].url }}
                    style={{ width: width - 24, height }}
                />
                {height > 600 && <Text
                    style={styles.viewLongImageBtn}
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                    点击查看长图
                </Text>}

                <Modal
                    // style={styles.fullModal}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <ScrollView style={styles.modalView}>
                        <Image
                            source={{ uri: large_image.url_list[0].url }}
                            style={{ width, height }}
                        />
                    </ScrollView>
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
        return (
            <View style={styles.panel}>
                <AvatarNickname
                    _avatar={this.props._data.user.avatar_url}
                    _nickname={this.props._data.user.name}
                // _avatarNicknameStyle={}
                />
                <Text style={styles.description}>{this.props._data.content}</Text>
                {this.props._type === 'image' && this.ImageCom()}
                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>{this.props._data.category_name}</Text>
                </View>

                {this.props._hotComments.length > 0 && this.HotComments()}
                <View style={styles.iconBar}>
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='commend'
                        _iconStyle={StyleSheet.flatten(styles.iconStyle)}
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.digg_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='deny'
                        _iconStyle={StyleSheet.flatten(styles.iconStyle)}
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.bury_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='comment'
                        _iconStyle={StyleSheet.flatten(styles.iconStyle)}
                        _textStyle={{ color: "#ccc" }}
                        _text={`${this.props._data.comment_count}`}
                    />
                    <Button
                        _style={StyleSheet.flatten(styles.iconBtn)}
                        _icon='share'
                        _iconStyle={StyleSheet.flatten(styles.iconStyle)}
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
        padding: 12
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
    iconStyle: {

        width: 18,
        height: 18,
        marginRight: 6,
        tintColor: '#ccc'
    },
    iconBtn: {
        borderWidth: 0,
    },
    imgContainer: {
        position: 'relative',
        maxHeight: 600,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'red',
        marginTop: 10
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
    }

})