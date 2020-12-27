import { useEffect, useState } from "react"
import React from "react"
import "./root.less"
import * as images from "./constants"

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

const RootElement = ({ element }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    importImages().then(() => {
      setLoading(false)
    })
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