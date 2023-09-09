import { ref } from 'vue';

/**
 * 将后端传入的base64编码字符串转换为图片
 * @param {string} base64String - base64编码格式的字符串（后端返回的fileContents）
 * @param {string} fileFormat - 图像格式，限制写死为'image/png'、'image/jpeg'
 * @returns {string} 解析后文件的url
 */

/**
 *  fileFormat说明：图像的MIME类型，用于标识和描述互联网上各种数据类型的标准，
 *  目前测试确认成功的是jpeg和png
 *  图像常见的MIME类型如下：传入参数只能《写死》如下几种
 *  image/jpeg : JPEG 图像文件
 *  image/png : PNG图像文件
 *  image/gif : GIF 图像文件
 *  image/bmp : BMP 图像文件
 *  image/webp : WebP 图像文件
 *  image/svg+xml : SVG（可缩放矢量图形）文件
 */

export function base64ToUrl(base64String,fileFormat) {

    const  imageSrc= ref('');

    // 方法1:生成临时url(blob:http://localhost:8080/),直接点击不可见

    // 使用 atob() 函数解码 Base64 编码的数据
    const decodedData = atob(base64String);
    // 创建一个 Uint8Array 来存储解码后的数据
    const uint8Array = new Uint8Array(decodedData.length);
    // 将解码后的数据的每个字符的 Unicode 编码值存储到 Uint8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }
    // 使用 Blob 对象创建一个 Blob，将 Uint8Array 作为参数传入
    // 设置 MIME 类型为 'image/png' 表示图片是 PNG 格式
    const blob = new Blob([uint8Array], { type: fileFormat });
    // 使用 URL.createObjectURL() 创建一个可用于图片 src 属性的 URL
    imageSrc.value = URL.createObjectURL(blob);

    // 方法2： 直接点击imageSrc.value可见（data:image/png;base64,...）
    // const imgString = base64String;//fileContents是返回响应中的base64字符串
    // imageSrc.value = 'data:image/png;base64,' + imgString;//进行简单字符串连接

    return imageSrc.value;

  };