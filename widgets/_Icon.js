import { createIconSet } from 'react-native-vector-icons'


const glyphMap = {
    edit: 58891, comment: 59161, hot: 58905,
    search: 59034, joke: 58907, fullscreen: 60317,
    deny: 60318, fullscreenexit: 59039, jubao: 58913,
    tubiaozhizuomoban: 58914, message: 58917,
    arrowtop: 58919, loadingout: 58920, arrowdown: 58921,
    profile: 58928, shoucang: 58931, arrowleft: 58934,
    htmal5icon23: 58939, weibiaoti555: 58940, cai: 59077,
    commend: 59078, share: 58968, previewright: 59228, plus: 59107,
    copy: 58911, x: 120
}
const iconSet = createIconSet(glyphMap, 'Iconfont', 'iconfont.ttf');

export default iconSet;
