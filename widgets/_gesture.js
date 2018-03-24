import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  PanResponder,
  Text,
  Dimensions
} from 'react-native'


export default class GestureCom extends React.Component {
  static propTypes = {
    minWidth: PropTypes.number,  //缩放宽度的最小值
  }
  static defaultProps = {
    minWidth: 60,
    ratio:1,
  }
  screenWidth = 0
  firstDistance = 0
  isZoom = false
  state = {
    left: 0, top: 0,
    cLeft: 0, cTop: 0,
    preWidth: 0 , preHeight: 0,
    cWidth: 0, cHeight: 0
  }

  zoom(ratio) { //two fingers
    if (ratio === 1) return
    const preWidth = this.state.preWidth
    const preHeight = this.state.preHeight
    const cWidth = preWidth * ratio
    if (cWidth < this.props.minWidth) return
    const cHeight = preHeight * ratio
    // console.log('zoom', ratio, this.state.preWidth, cWidth, this.state.preHeight, cHeight)
    this.setState({
      cWidth,
      cHeight,
    })
    this.move((preWidth - cWidth) / 2, (preHeight - cHeight) / 2)
  }
  move(disX, disY) { //one finger
    this.setState({
      cLeft: this.state.left + disX,
      cTop: this.state.top + disY
    })

  }
  getRatio() {

  }
  getDistance() {
  }
  bakState(obj) {
    this.setState(obj)
  }
  componentDidMount(){
    // 设置宽高
    const {width} = Dimensions.get('window')
    this.setState({
      preWidth : width,
      preHeight:width / this.props.ratio,
      cWidth : width,
      cHeight:width /this.props.ratio
    })
    this.screenWidth = width
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => gestureState.numberActiveTouches < 3,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => gestureState.numberActiveTouches < 3,
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.numberActiveTouches < 3,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => gestureState.numberActiveTouches < 3,
      onPanResponderStart: (evt, gestureState) => {
        const { touches } = evt.nativeEvent.changedTouches[0]
        const number = gestureState.numberActiveTouches
        if (number === 1) {
          this.isZoom = false
        } else if (number === 2) {
          this.isZoom = true
          const firstX = touches[0].pageX
          const firstY = touches[0].pageY
          const secondX = touches[1].pageX
          const secondY = touches[1].pageY
          this.firstDistance = Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2))
        }
        return false
      },
      onPanResponderMove: (evt, gestureState) => {
        const { touches } = evt.nativeEvent.changedTouches[0]
        const number = gestureState.numberActiveTouches
        // return
        // 1. one finger to move
        if (number === 1 && !this.isZoom) {
          this.move(gestureState.dx, gestureState.dy)
        }
        // 2.two fingers to zoom
        if (number === 2 && this.isZoom) {
          const firstX = touches[0].pageX
          const firstY = touches[0].pageY
          const secondX = touches[1].pageX
          const secondY = touches[1].pageY
          const distance = Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2))
          const ratio = distance / this.firstDistance
          this.zoom(ratio)
        } else {

          return false
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => gestureState.numberActiveTouches > 2, //防止手势被接管
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const number = gestureState.numberActiveTouches
        // 1.备份移动距离，setState为异步 只能这样存
        console.log('release', number)

        if (number === 1 && !this.isZoom) {
          this.bakState({ left: this.state.left + gestureState.dx, top: this.state.top + gestureState.dy })
        } else {
          // 2. zoom over
          this.firstDistance = 0
          this.setState({
            preHeight: this.state.cHeight,
            preWidth: this.state.cWidth,
            left: this.state.cLeft,
            top: this.state.cTop
          })
          this.isZoom = false
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        console.log('Terminate', evt)
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }
  render() {
    const props = Object.assign(
      { ...this._panResponder.panHandlers },
      { style: { left: this.state.cLeft, top: this.state.cTop, position: 'absolute', width: this.state.cWidth, height: this.state.cHeight, backgroundColor: 'red' } }
    )
    return (
      <View
        style={[{ backgroundColor: 'rgba(0,0,0,.6)', flex: 1, position: 'relative' }, this.props._style]}
      >
        {this.props.renderItem(props)}
      </View>
    )
  }
}
