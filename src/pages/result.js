import React, { useCallback, useEffect, useState } from "react"
import "./result.less"
import { navigate } from "gatsby"
import { Stage, Layer, Rect, Text, Image } from "react-konva"
import FontFaceObserver from "fontfaceobserver"
import useImage from "use-image"
import { loadingImg, qrImg, resultImg } from "../constants"

const gap = 50
const screenWidth = 375

const words = [
  "平安喜乐",
  "活泼圆润",
  "简简单单",
  "奶茶自由",
  "发型酷炫",
  "胃口大开",
  "多吃不胖",
  "食欲大涨",
  "心态平和",
  "一身肌肉",
  "暖暖和和",
  "吃饱喝足",
  "热水多喝",
  "生机勃勃",
  "健康养生",
  "成长快乐",
  "步履不停",
  "高耸入云",
  "天天向上",
  "红红火火",
  "会穿秋裤",
  "五颜六色",
  "重在参与",
  "好吃好喝",
  "充实日常",
  "毫不离谱"
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

const ResultPage = ({ location }) => {
  const font = new FontFaceObserver("happy")
  const [loading, setLoading] = useState(true)
  const [fontLoaded, setFontLoaded] = useState(false)
  location.state = location.state || {
    username: localStorage.getItem("username")
  }
  const words = pickNWords(4)
  const { username } = location.state
  const [image] = useImage(resultImg, "Anonymous")
  const [qrCode] = useImage(qrImg, "Anonymous")
  const [finalImage, setFinalImage] = useState(null)
  const [stage, setStage] = useState(null)
  let imgWidth = 0
  let imgHeight = 0
  if (image) {
    imgWidth = screenWidth - gap
    imgHeight = image.height / image.width * imgWidth
  }
  font.load().then(() => {
    setFontLoaded(true)
  })
  useEffect(() => {
    if (image && fontLoaded && qrCode) {
      setLoading(false)
    }
  }, [image, fontLoaded, qrCode])
  const measuredRef = useCallback(node => {
    if (node !== null && !loading) {
      setStage(node)
    }
  }, [loading])

  useEffect(() => {
    if (stage) {
      stage.toImage({
        callback(img) {
          setFinalImage(img)
        },
        mimeType: "image/jpeg",
        quality: 1,
        pixelRatio: 2
      })
    }
  }, [stage])
  const goback = () => {
    navigate("/input", { replace: true })
  }
  const saveImage = () => {
    alert("长按保存")
  }
  return (
    <div className="result-page">
      <div className="bg">
        <div className="links">
          <span>weibo: <a className="bee" href="https://weibo.com/u/2873304745">INBing</a></span>
          <span style={{ margin: "0 10px" }}>/</span>
          <span>more: <a className="bee"
                         href="https://www.noddl.me">次元蜜蜂</a>
          </span>
        </div>
        {
          loading ? <img
              style={{ marginTop: 30 }}
              src={loadingImg} alt="Loading" />
            :
            <Stage ref={measuredRef} className="stage" width={screenWidth} height={640}>
              <Layer>
                <Rect width={screenWidth} height={640} fill="#ffffff" />
              </Layer>
              <Layer>
                <Image x={gap / 2} y={gap / 2} width={imgWidth} height={imgHeight} image={image} />
                <Text fontFamily="happy" x={170} y={115} fontSize={23} width={48} height={48} fill="#ffffff"
                      text={words[0]} />
                <Text fontFamily="happy" x={215} y={175} fontSize={21} width={48} height={48} fill="#ffffff"
                      text={words[1]} />
                <Text fontFamily="happy" x={167} y={205} fontSize={21} width={48} height={48} fill="#ffffff"
                      text={words[2]} />
                <Text fontFamily="happy" x={108} y={205} fontSize={21} width={48} height={48} fill="#ffffff"
                      text={words[3]} />
                <Text width={270} x={gap / 2} height={10} y={imgHeight + 45} fontSize={23} fontStyle="bold"
                      fill="#A1A1A1"
                      text={`2021的${username}`} />
                <Text x={gap / 2} y={imgHeight + 42 + 40} fontSize={18} fontStyle="bold" fill="#A1A1A1"
                      text={"寒来暑往，新年快乐。"} />
                <Text x={gap / 2} y={imgHeight + 42 + 40 + 25} fontSize={12} fontStyle="bold" fill="#C7C7C7"
                      text={"长按图片 一起生成你的「2021」"} />
                <Image image={qrCode} width={64} height={64} x={screenWidth - gap / 2 - 64}
                       y={imgHeight + 45} />
              </Layer>
            </Stage>
        }
        {
          finalImage ? <img className="result-image" src={finalImage.src} alt="" /> : null
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
