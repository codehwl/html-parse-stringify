const html1 = `
  <p><img src="https://example.com/shop/productDetail/2023/03/16/fbdefadd-cf32-44a5-b0dc-39fdbf7b9aa5.png" style="font-family: -apple-system-font, BlinkMacSystemFont; max-width: 100%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" /><img src="https://example.com/shop/productDetail/2023/03/16/9669e4e9-3ea9-4aae-b07f-3c63e8bb2493.png" style="font-family: -apple-system-font, BlinkMacSystemFont; max-width: 100%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" /><br></p>
  <p>这是介绍哦</p>
  <p>测试测试&nbsp;<img src="https://example.com/shop/productDetail/2023/03/16/02e010cc-41e8-4427-9a74-f07984cb3f54.png" style="max-width:100%;width:100%;display:inline-block;vertical-align:middle;" /><img src="https://example.com/shop/productDetail/2023/03/16/02e010cc-41e8-4427-9a74-f07984cb3f54.png" style="font-family:-apple-system-font, BlinkMacSystemFont; max-width:30%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" /><br /></p>
  <p>还不错吧？哈哈</p>
  <p><img src="https://example.com/shop/productDetail/2023/03/16/da172ec2-f265-4b74-adec-df56bd880a88.png" style="font-family:-apple-system-font, BlinkMacSystemFont; max-width:50%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" />&nbsp; 测一测啦<br /></p>
  <p>欢迎来到我们的在线商店，我们很高兴为您介绍我们的最新产品 - 「智能手表」！</p>
  <p>这款智能手表采用最先进的技术，配备了许多令人惊叹的功能，可以轻松地满足您的生活需求。以下是该产品的一些主要特点：</p>
  <ol>
  <li><p>健康监测：智能手表可以监测您的心率、血氧水平、步数和睡眠情况等健康指标，帮助您保持健康的生活习惯。</p></li>
  <li><p>智能通知：手表可以与您的智能手机配对，显示来自社交媒体、电子邮件和其他应用的通知，让您随时随地保持连接。</p></li>
  <li><p>多项运动模式：手表可以追踪您的运动数据，包括跑步、骑行、游泳和瑜伽等多种运动模式，让您更好地了解自己的身体状况。</p></li>
  <li><p>音乐控制：手表可以控制您的音乐播放器，让您可以随时随地享受您喜欢的音乐。</p></li>
  <li><p>防水防尘：手表防水等级达到IP68，可以在深度为50米的水下使用，并且可以抵御灰尘和污垢的侵蚀。</p></li>
  </ol>
  <p>智能手表采用高品质的材料制作，非常耐用。它还具有现代感和时尚感，适合各种场合的佩戴。</p>
  <p>
    <img 
      src="https://example.com/shop/productDetail/2023/03/16/e088b457-2124-43d1-b892-766bc0ac8eff.png" 
      style="max-width:100%;width:100%;display:inline-block;vertical-align:middle;" />
    <img src="https://example.com/shop/productDetail/2023/03/16/6cbf3174-6014-4664-b01f-35ae6444ef86.png"
      style="font-family: -apple-system-font, BlinkMacSystemFont; max-width: 100%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" />
    <img src="https://example.com/shop/productDetail/2023/03/16/489db0c6-b725-441b-a8fe-48f03dd988f2.png" style="font-family: -apple-system-font, BlinkMacSystemFont; max-width: 100%;max-width:100%;width:100%;display:inline-block;vertical-align:middle;" /><br />
  </p> 
`

// const html2 = '<p style="color: red;"><span>测试</span></p>'
// const html3 = '<p style="color: red;"><img src="xyz.com" alt="测试"><img src="xyz.com" alt="测试"><br><span>你好</span></p>'
// const html4 = '<p style="color: red;"><span>测试</span></p><div>asd</div><br>'
// const html5 = '<div><div><p>1de1</p><p>1de2</p></div><div><p>2-1</p><p>2-2</p></div><img src="xyz.com" alt="图片"></div>'
const html6 = `
<section>
  <div>
    <p>1-1</p>
    <p>1-2</p>
    <p>1-3</p>
  </div>
  <div>
    <p>2-1</p>
    <p>2-2</p>
  </div>
  <img src="xyz.com" alt="图片">
  </section>
  `

// <!-- 这是注释内容 -->
// const html7 = '<!DOCTYPE html><html><!-- <测试->--><div disabled title="这是标题"><</div><p>></p></html>'
// const html8 = '<script>var html = \'<div></div>\'</script>'
// const html9 = '<div> <div> </span> </div>'
// const compiler = require('./node/compiler')
// const generateCode = require('./node/generateCode')
const html10 = `<div>123<span>asd</span></div>`
import HTML from './dist/bundle.js'
const ast = HTML.parse('15', {
  logTokens: true
})

console.log('--------------------- AST ---------------------\n')
console.log(ast)
// console.log('--------------------- AST ---------------------\n')
// console.log(JSON.stringify(ast))
// console.log(ast)

const html = HTML.stringify(ast)
console.log(html)
