import React from 'react'
import Video from 'react-native-video'
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    SectionList,
    TouchableOpacity,
    Platform,
    Modal
} from 'react-native'

import Orientation from 'react-native-orientation'

import PlayProgressBar from './playProgressBar'

export default class VideoCom extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            paused: true,
            showVedioTag: false,
            poster: this.props._data.large_cover.url_list[0].url,
            didPlay: false,
            finished: false,
            isErr: false,
            showPausedTools: false,
            progress: 0,
            loading: false,
            repeat: false,
            progressRatio: '1%',
            duration: 0,
            currentTime: 0,
            loaded:false,
            androidFullScreen:false
        }
    }

    loadingImageStart() {
        // console.log(arguments, 'loading')
    }
    loadStart() {
        this.setState({
            isErr: false,
            loading: true
        })
    }
    setDuration({ duration }) {
        this.setState({
            isErr: false,
            loading: false,
            duration,
            loaded:true
        })

    }
    setTime({ currentTime, playableDuration }) {
        const ratio = (currentTime / playableDuration * 100) + '%'
        this.setState({
            progressRatio: ratio,
            currentTime
        })
    }
    onEnd() {
        this.setState({
            finished: true,
            progressRatio: '100%',
            paused: true
        })
    }
    videoError() {
        this.setState({
            isErr: true,
            poster: ''
        })
    }
    playVideo() {
        this.setState({
            paused: !this.state.paused,
            poster: '',
            didPlay: true,
        })
    }
    pauseVideo() {
        this.setState({
            paused: !this.state.paused,
        })
    }
    replay() {
        this.setState({
            paused: false,
            progressRatio: '1%',
            finished: false,
        })
        this.player.seek(0)
    }
    getDuration() {
        const seconds = Math.floor(this.props._data.duration)
        let formattedTime = ""
        function fill0(num) {
            return num > 9 ? num : `0${num}`
        }
        function getTime(time) {
            if (typeof time !== 'number') return
            const int = time % 60
            if (int) {
                formattedTime = ':' + fill0(int) + formattedTime
            } else {
                formattedTime = ':00' + formattedTime
            }
            let higherInt = Math.floor(time / 60)
            if (higherInt) {
                return getTime(higherInt)
            }
            return formattedTime.length === 3 ? '00' + formattedTime : formattedTime.replace(/^:/, '')
        }
        return getTime(seconds)

    }
    showPausedToolsFn() {
        this.setState({
            showPausedTools: true
        })
        const timer = setTimeout(_ => {
            this.setState({
                showPausedTools: false
            })
            clearTimeout(timer)
        }, 3000)
    }
    _keyExtractor({ video_id }) {
        return video_id
    }
    onSliding(val) {
        // console.log(val)
        this.player.seek(val)
        this.setState({
            currentTime: val
        })
    }
    _onLayout(e){
        // console.log(e.nativeEvent)
    }
    openFullScreenVideo(){
        const { OS } = Platform
        if(OS === 'ios'){
            this.player.presentFullscreenPlayer()
        }
        Orientation.lockToPortrait()
        alert('here')
    }

    render() {
        const {width,height} = Dimensions.get('window')
        const { video_width, video_height } = this.props._data
        const ratio = video_width / video_height
        const wrapHeight = parseInt((width - 33) / ratio)
        return (
            <View
            onLayout = {_=>this._onLayout(_)}
                style={{ width:width-33, height:wrapHeight, position: 'relative', zIndex:8, backgroundColor: 'rgba(0,0,0,.7)', justifyContent: 'center', alignItems: 'center' }}>
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    source={{ uri: this.props._data.mp4_url}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                    poster={this.state.poster}// uri to an image to display until the video plays
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={this.state.paused}   // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={false}                // Repeat forever.
                    onLoadStart={_ => this.loadStart()} // Callback when video starts to load
                    onLoad={_ => this.setDuration(_)}    // Callback when video loads
                    onProgress={_ => this.setTime(_)}    // Callback every ~250ms with currentTime
                    onEnd={_ => this.onEnd()}           // Callback when playback finishes
                    onError={_ => this.videoError()}    // Callback when video cannot be loaded
                    style={styles.backgroundVideo}
                />
                {/* 初始状态 */}
                {!this.state.didPlay && !this.state.isErr && this.state.loaded
                    ? (<View style={styles.vedioTagContainer}><Text
                        style={styles.palyBtn}
                        onPress={_ => this.playVideo()}
                    >播放</Text>
                        <View style={styles.vedioTag}>
                            <View style={styles.vedioTag_playedCount}>
                                <Text style={{ color: '#ff819f', fontSize: 12 }}>{this.props._data.play_count}</Text>
                                <Text style={{ color: '#fff', fontSize: 12 }}> 次播放</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.vedioTag_vedio_totalTime}>{this.getDuration()}</Text>
                                <Text
                                    onPress = {_=>this.openFullScreenVideo()}
                                 style={{ fontSize: 12, color: "#fff",paddingLeft:10,paddingRight:6}}>全</Text>
                            </View>
                        </View></View>)
                    : null
                }
                {/* 加载中 */}
                {this.state.loading && <Text style={styles.videoErr}>视频加载中...</Text>}
                {/* 红色进度条 */}
                {!this.state.paused && !this.state.showPausedTools
                    ? <View style={[styles.redProgressBar, { width: this.state.progressRatio }]}></View>
                    : null
                }
                {/* 加载视频失败 */}
                {this.state.isErr && <Text style={styles.videoErr}>视频加载失败...</Text>}
                {/* 播放后的功能 进度条及暂停 */}
                {this.state.didPlay && !this.state.finished ?
                    <TouchableOpacity
                        onPress={_ => this.showPausedToolsFn()}
                        style={styles.pausedBar}
                    >
                        {this.state.showPausedTools &&
                            <Text style={styles.palyBtn} onPress={_ => this.pauseVideo()}>{this.state.paused ? '播放' : '暂停'}</Text>
                        }
                        {this.state.showPausedTools &&
                            <PlayProgressBar
                                _currentTime={this.state.currentTime}
                                _totalTime={this.state.duration}
                                _onSliding={(val) => this.onSliding(val)}
                                _player={this.player}
                            />
                        }
                    </TouchableOpacity>
                    : null
                }
                {/* 播放完成后 */}
                {this.state.finished && <Text style={styles.palyBtn} onPress={_ => this.replay()}>重播</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    vedioTagContainer: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    palyBtn: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -30,
        marginTop: -30,
        width: 50,
        height: 50,
        lineHeight: 50,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 50,
        fontSize: 12,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    vedioTag: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.7)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
    },
    vedioTag_playedCount: {
        flexDirection: 'row'
    },
    vedioTag_vedio_totalTime: {
        color: '#fff',
        fontSize: 12,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    redProgressBar: {
        position: 'absolute',
        zIndex: 2,
        left: 0,
        bottom: 0,
        height: 2,
        backgroundColor: '#ff819f'
    },
    videoErr: {
        position: 'absolute',
        color: '#fff'
    },
    pausedBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },

})