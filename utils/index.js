export const $http= {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err))

        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                header: {
                    Accept: "application/json",
                    ContentType: "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}


import RNFB from 'react-native-fetch-blob'

// 1.创建路径

async function createDir(cate) {
    try {
        const categroy = cate || 'common'
        const { SDCardDir } = RNFB.fs.dirs
        const targetDir = SDCardDir + '/FunnyApps/' + categroy
        // 文件夹创建
        const isExists =  RNFB.fs.exists(targetDir)
        if(isExists){
            return targetDir
        }
        const created = RNFB.fs.mkdir(targetDir)
        if(created){
            return targetDir 
        }        
    } catch (err) {
        console.error('创建文件夹失败:' + err)
    }
}

// 2.判断文件是否存在
 async function cheakFileExists(filePath) {
    try {
        return await RNFB.fs.exists(filePath)
    } catch (err) {
        console.error('判断文件是否存在出错:' + err)
    }
}


// 3.下载文件

export async function downLoadFile(categroy, url) {
    if (typeof url === 'undefinde') return console.error('请配置文件远程路径')
    const fileExt = url.match(/\.\S+$/)[0] ? url.match(/\.\S+$/)[0] : (categroy === 'image' ? '.gif' : '.ext')
    const fileNameAndExt = url.match(/\/[^\/]+(\.[^\.]+)?$/)[0]
    
    const fileDir = await createDir(categroy)
    console.log(fileDir, fileNameAndExt)
    if (!fileDir) {
        console.error('文件件创建失败')
        return 
    }
    const isFileExists = await cheakFileExists(fileDir +fileNameAndExt)
    if(isFileExists){
        return console.warn('文件已保存')
    }
    RNFB.config({
        fileCache : true,
        path: fileDir + '/'+fileNameAndExt,
    })
    .fetch('GET',url)
    .then(res=>alert('文件保存于'+ res.path()))
    .catch(err=>console.error(err))
}


 