<template>
    <div>
        <h1 class="title">数字签名制作</h1>
        <h2 class="title">上传一张白纸手写签名图片，自动去除背景，截取签名</h2>
        <p class="title" style="color: chocolate;">严正声明：纯前端处理，不会保存任何用户数据</p>
    </div>
    <div class="use-flexbox">
        <el-card shadow="always">
            <el-row class="row-bg" justify="space-around" :gutter="20">
                <el-col :span="12">
                    <div>
                        <div class="btn">
                            <input type="file" @change="onFileChange" />
                        </div>
                        <div class="imgBackgroung">
                            <img :src="imgSrc" width="400" height="400" v-if="imgSrc !== ''" />
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <div class="btn">
                            <button @click="download" :disabled="imgDst === ''">下载</button>
                        </div>
                        <div class="imgBackgroung">
                            <img :src="imgDst" :width="imgDstWidth" :height="imgDstHeight" v-if="imgDst !== ''" />
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>



<script>
export default {
    name: 'RemoveBG',
    data() {
        return {
            imgSrc: '',
            imgDst: '',
            selected: false,
            imgDstWidth: 200,
            imgDstHeight: 200,
        }
    },
    methods: {
        onFileChange(e) {
            this.selected = true
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.imgSrc = reader.result
                const img = new Image()
                img.src = this.imgSrc
                img.onload = () => {
                    this.removeImgBgFromLoadedImage(img)
                }
            }
        },
        // 使用canvas去除图片背景
        removeImgBgFromLoadedImage(img) {
            // 容差大小
            const tolerance = 90

            var imgData = null
            var r, g, b, a
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const w = img.width
            const h = img.height

            canvas.width = w
            canvas.height = h
            context.drawImage(img, 0, 0)
            imgData = context.getImageData(0, 0, w, h)

            // 获取图片左上角第一个像素的颜色
            const [r0, g0, b0, a0] = [
                imgData.data[0],
                imgData.data[1],
                imgData.data[2],
                imgData.data[3],
            ]

            for (let i = 0; i < imgData.data.length; i += 4) {
                r = imgData.data[i]
                g = imgData.data[i + 1]
                b = imgData.data[i + 2]
                a = imgData.data[i + 3]
                const t = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2 + (a - a0) ** 2)
                if (t <= tolerance) {
                    imgData.data[i] = 0
                    imgData.data[i + 1] = 0
                    imgData.data[i + 2] = 0
                    imgData.data[i + 3] = 0
                }
            }

            context.putImageData(imgData, 0, 0)

            // 查找RGBA不为0的图片边界
            let x1 = w
            let y1 = h
            let x2 = 0
            let y2 = 0
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (imgData.data[i] !== 0) {
                    x1 = x1 > (i / 4) % w ? (i / 4) % w : x1
                    y1 = y1 > Math.floor(i / 4 / w) ? Math.floor(i / 4 / w) : y1
                    x2 = x2 < (i / 4) % w ? (i / 4) % w : x2
                    y2 = y2 < Math.floor(i / 4 / w) ? Math.floor(i / 4 / w) : y2
                }
            }

            // 添加上下边界20px，左右边界80px
            x1 = x1 - 80 < 0 ? 0 : x1 - 80
            y1 = y1 - 20 < 0 ? 0 : y1 - 20
            x2 = x2 + 80 > w ? w : x2 + 80
            y2 = y2 + 20 > h ? h : y2 + 20

            // 保留x1,y1到x2,y2的区域，裁剪图片，放到cropCanvas中
            const cropCanvas = document.createElement('canvas')
            const cropContext = cropCanvas.getContext('2d')
            cropCanvas.width = x2 - x1
            cropCanvas.height = y2 - y1
            const newImgData = context.getImageData(x1, y1, x2 - x1, y2 - y1)
            cropContext.putImageData(newImgData, 0, 0)

            // 缩放newImgData图片，宽缩放到200px，高等比例缩放，结果放到scaleCanvas中
            const scaleCanvas = document.createElement('canvas')
            const scaleContext = scaleCanvas.getContext('2d')
            const scale = 200 / cropCanvas.width
            scaleCanvas.width = 200
            scaleCanvas.height = cropCanvas.height * scale
            this.imgDstWidth = scaleCanvas.width
            this.imgDstHeight = scaleCanvas.height
            scaleContext.drawImage(cropCanvas, 0, 0, scaleCanvas.width, scaleCanvas.height)

            // 将scaleCanvas转换成base64，赋值给imgDst
            const newBase64 = scaleCanvas.toDataURL('image/png')
            this.imgDst = newBase64
        },
        // 保存图片，下载图片
        download() {
            const a = document.createElement('a')
            a.href = this.imgDst
            a.download = '数字签名'
            a.click()
            a.remove()
        }
    },

}
</script>

<style scoped>
.imgBackgroung {
    background-color: #eee;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    margin-bottom: 20px;
}

.use-flexbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    /* border: 1px solid #000; */
    /* background: #099; */
}

.title {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}


</style>