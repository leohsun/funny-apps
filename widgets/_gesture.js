import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  PanResponder,
  Text,
} from 'react-native'

export default class GestureCom extends React.Component {
  static propTypes = {
    minWidth: PropTypes.number  //缩放宽度的最小值
  }
  static defaultProps = {
    minWidth: 60
  }
  firstDistance = 0
  isZoom = false
  state = {
    left: 0, top: 0,
    cLeft: 0, cTop: 0,
    preWidth: 100, preHeight: 100,
    cWidth: 100, cHeight: 100
  }

  zoom(ratio) { //two fingers
    if (ratio === 1) return
    const preWidth = this.state.preWidth
    const preHeight = this.state.preHeight
    const cWidth = preWidth * ratio
    if(cWidth < this.props.minWidth) return
    const cHeight = preWidth * ratio
    // if (cWidth < this. props.minWidth) return
    console.log('zoom', ratio, this.state.preWidth, cWidth, this.state.preHeight, cHeight)
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
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        const { changedTouches } = evt.nativeEvent
        console.log('start', changedTouches.length)
      },
      onPanResponderMove: (evt, gestureState) => {
        const { changedTouches } = evt.nativeEvent
        console.log(changedTouches.length)
        // 1. one finger to move
        if (changedTouches.length === 1 && !this.isZoom) {
          this.isZoom = false
          this.move(gestureState.dx, gestureState.dy)
        }
        // 2.two fingers to zoom
        if (changedTouches.length === 2) {
          this.isZoom = true
          const firstX = changedTouches[0].pageX
          const firstY = changedTouches[0].pageY
          const secondX = changedTouches[1].pageX
          const secondY = changedTouches[1].pageY
          const distance = Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2))
          this.firstDistance === 0 && (this.firstDistance = distance)
          const ratio = distance / this.firstDistance
          this.zoom(ratio)
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { changedTouches } = evt.nativeEvent
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        // 1.备份移动距离，setState为异步 只能这样存
        console.log(this.isZoom)
        if (!this.isZoom) {
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
        console.log('Terminate')
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }
  render() {
    return (
      <View
        style={{ backgroundColor: 'orange', flex: 1, position: 'relative' }}
      >
        <View  {...this._panResponder.panHandlers} style={{ left: this.state.cLeft, top: this.state.cTop, position: 'absolute', width: this.state.cWidth, height: this.state.cHeight, backgroundColor: '#ff819f' }}></View>
      </View>
    )
  }
}
