import React, { useState } from "react"
import "./result.less"
import { navigate } from "gatsby"
import { Stage, Layer, Rect, Text, Image } from "react-konva"
import FontFaceObserver from "fontfaceobserver"
import resultSVG from "../images/result.png"
import useImage from "use-image"

const gap = 50
const screenWidth = 375

// const ResultImg = ({ imgWidth, imgHeight }) => {
//   const [image] = useImage(resultSVG)
//   if (!image) {
//     return null
//   } else {
//     imgWidth = screenWidth - gap
//     imgHeight = image.height / image.width * imgWidth
//     return <Image x={gap / 2} y={gap / 2} width={imgWidth} height={imgHeight} image={image} />
//   }
// }

const words = [
  "平安喜乐",
  "活泼圆润",
  "简单快乐",
  "奶茶自由",
  "发型酷炫",
  "胃口大开",
  "好吃不胖",
  "发量上涨",
  "食欲大涨",
  "心态平和",
  "一身肌肉",
  "身高增长",
  "皮肤光滑",
  "黝黑发亮",
  "热水多喝",
  "生机勃勃",
  "健康养生",
  "成长快乐",
  "步履不停",
  "高耸入云",
  "天天向上",
  "红红火火",
  "会穿秋裤",
  "五颜六色"
]

const pickNWords = (n) => {
  const arr = []
  while (arr.length < n) {
    const idx = Math.floor(Math.random() * words.length)
    const word = words[idx]
    if (arr.includes(word)) {
      continue
    } else {
      arr.push(word)
    }
  }
  return arr
}

const downloadURI = (uri, name) => {
  let link = document.createElement("a")
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const ResultPage = ({ location }) => {
  const font = new FontFaceObserver("happy")
  const [loading, setLoading] = useState(true)
  location.state = location.state || {
    username: localStorage.getItem("username")
  }
  const { username } = location.state
  const stageRef = React.useRef(null)
  const [image] = useImage(resultSVG)
  let imgComponent = null
  let imgWidth = 0
  let imgHeight = 0
  if (image) {
    imgWidth = screenWidth - gap
    imgHeight = image.height / image.width * imgWidth
    imgComponent = <Image x={gap / 2} y={gap / 2} width={imgWidth} height={imgHeight} image={image} />
  }
  const words = pickNWords(4)
  font.load().then(() => {
    setLoading(false)
  })
  const goback = () => {
    navigate("/input")
  }
  const saveImage = () => {
    const uri = stageRef.current.toDataURL({
      mimeType: "image/jpeg",
      quality: 1,
      pixelRatio: 2
    })
    downloadURI(uri, "rabbit-2021.png")
  }
  return (
    <div className="result-page">
      <div className="bg">
        <div className="links">
          <span>weibo: <b>INBING</b></span> <span>/</span> <span>more: <b>次元蜜蜂</b></span>
        </div>
        {
          loading ? <h1>生成中...</h1> :
            <Stage ref={stageRef} className="stage" width={screenWidth} height={640}>
              <Layer>
                <Rect width={screenWidth} height={640} fill="#ffffff" />
              </Layer>
              <Layer>
                {imgComponent}
                <Text fontFamily="happy" x={175} y={115} fontSize={23} width={48} height={48} fill="#ffffff"
                      text={words[0]} />
                <Text fontFamily="happy" x={218} y={175} fontSize={23} width={48} height={48} fill="#ffffff"
                      text={words[1]} />
                <Text fontFamily="happy" x={165} y={205} fontSize={23} width={48} height={48} fill="#ffffff"
                      text={words[2]} />
                <Text fontFamily="happy" x={98} y={205} fontSize={23} width={48} height={48} fill="#ffffff"
                      text={words[3]} />
                <Text x={gap / 2} y={imgHeight + 45} fontSize={26} fontStyle="bold" fill="#A1A1A1"
                      text={`2021的${username}`} />
                <Text x={gap / 2} y={imgHeight + 45 + 40} fontSize={18} fontStyle="bold" fill="#A1A1A1"
                      text={"寒来暑往，新年快乐。"} />
                <Text x={gap / 2} y={imgHeight + 45 + 40 + 25} fontSize={12} fontStyle="bold" fill="#C7C7C7"
                      text={"长按图片 一起生成你的「2021」"} />
              </Layer>
            </Stage>
        }
        <div className="tools">
          <button className="generate play-again" onClick={goback}>再来一次
          </button>
          <button className="generate save" onClick={saveImage}>保存图片</button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
