import React from 'react'
import { View, Text, Animated, StyleSheet, Dimensions, Easing } from 'react-native'


/**
 * Toast.success(content, duration, onClose, mask)
 * Toast.fail(content, duration, onClose, mask)
 * Toast.info(content, duration, onClose, mask)
 * Toast.loading(content, duration, onClose, mask)
 * Toast.offline(content, duration, onClose, mask)
 */
export default class Toast extends React.Component {

    state = {
        isShow: false,
        opacity: new Animated.Value(0), //透明度
        scale: new Animated.Value(0), //...
        content: 'this is a center toast',
        duration: 3000,
        position: 'center',
        maxWidth:0 // 80% 屏幕快
    }

    componentDidMount() {
        //計算maxwidth 
        const { width } = Dimensions.get('window')
        this.setState({
            maxWidth: Math.ceil(width * .8)
        })
        
    }
    /**
     * 
     * @param {文本} text 
     * @param {提示显示时间} duration 
     * @param {配置文件} config 
     * @param {提示完成后的回掉} callback 
     * 
     */
    show(content, config, onClose) {
        // 优化用户传参
        this.setState({ content })
        if (arguments.length === 2 && typeof config === 'function') {
            this.onClose = config
        }
        if (arguments.length === 3) {
            // 判断传入参数格式
            if (typeof config !== 'object') return console.error('config必须为对象{duration:1000,position:"top"}')
            if (typeof onClose !== 'function') return console.error('回调函数格式错误')
            // 参数映射
            for (let k in config) {
                if (typeof config !== 'object') return console.error('config必须为对象{duration:1000,position:"top"}')
                if (this.state.hasOwnProperty(k))  //检验传参
                    this.setState({ [k]: config[k] })
            }
        }

        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 20
        }).start(() => {  //start finished callback
            this.setState({
                isShow: true
            })
        })
        Animated.timing(this.state.scale, {
            toValue: 1,
            duration: 400,
            easing: Easing.bezier(.63,.16,.4,1.54)
        }).start(() => {  //start finished callback
            this.timer = setTimeout(_=>{
                this.close()
            },this.state.duration)
        })
    }
    close(){
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 400
        }).start()
        Animated.timing(this.state.scale, {
            toValue: 0,
            duration: 400
        }).start(() => {  //start finished callback
            this.setState({
                isShow: false
            })
            this.timer && clearTimeout(this.timer)
            this.onClose && this.onClose()
        })
    }
    render() {
        const view = this.state.isShow
            ? <View style={[styles.container,styles[`${this.state.position}`]]}>
                <Animated.View style={{ opacity: this.state.opacity,maxWidth:this.state.maxWidth,transform:[{scale: this.state.scale}] }}>
                    <Text style={styles.content}>{this.state.content}</Text>
                </Animated.View>
            </View>
            : null
        return view

    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 200,
        alignItems:'center',
    },
    center:{
        top:'50%',
        transform:[{translateY:-20}]
    },
    
    animatedView: {
        alignItems: 'center',
    },
    content: {
        minWidth: 100,
        borderRadius: 3,
        color: '#fff',
        backgroundColor: 'rgba(58, 58, 58, 0.9)',
        fontSize: 20,
        lineHeight: 20,
        padding: 6,
    }
})