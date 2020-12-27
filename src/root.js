import { useEffect, useState } from "react"
import React from "react"
import "./root.less"
import * as images from "./constants"
import FontFaceObserver from "fontfaceobserver"

const imagesCache = {}
const syncUrls = [
  images.heartImg,
  images.my2021Img,
  images.rabbitBottomImg,
  images.rabbitIndexImg
]
const asyncUrls = [
  images.resultImg,
  images.qrImg
]
const importImages = async () => {
  // const importAll = requireContext => requireContext.keys().forEach(key => imagesCache[key] = requireContext(key))
  // importAll(require.context("./images/", false, /\.(svg)|(png)$/))
  Promise.all(asyncUrls.map(url => {
    const img = new Image(1, 1)
    img.src = url
    return img.decode()
  })).then(() => {
    console.log("async images loaded")
  })
  await Promise.all(syncUrls.map(url => {
    const img = new Image(1, 1)
    img.src = url
    return img.decode()
  }))
}
const importFonts = () => {
  const font = new FontFaceObserver("happy")
  font.load(null, 10000).then(() => {
    console.log("async fonts loaded")
  })
}
const RootElement = ({ element }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    importImages().then(() => {
      setLoading(false)
    })
    importFonts()
  }, [])
  return (
    <div className="root">
      {
        loading ?
          <img
            style={{ position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
            src={images.loadingImg} alt="Loading" />
          :
          element
      }
    </div>
  )
}

export default RootElement