import { useEffect, useState } from "react"
import React from "react"
import "./root.less"
import ReactLoading from "react-loading"

const imagesCache = {}
const BASE_URL = "https://cdn.jsdelivr.net/gh/dcalsky/bbq/rabbit/"

const RootElement = ({ element }) => {
  const [loading, setLoading] = useState(true)
  const urls = [
    "rabbit-index.svg",
    "heart.svg",
    "qr.png",
    "result.png",
    "my2021.png",
    "2m.png",
    "loading.gif"
  ]
  const importImages = async () => {
    // const importAll = requireContext => requireContext.keys().forEach(key => imagesCache[key] = requireContext(key))
    // importAll(require.context("./images/", false, /\.(svg)|(png)$/))
    await Promise.all(urls.map(url => {
      const img = new Image(1, 1)
      img.src = BASE_URL + url
      return img.decode()
    }))
  }
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
            src="https://cdn.jsdelivr.net/gh/dcalsky/bbq/rabbit/loading.gif" alt="Loading" />
          :
          element
      }
    </div>
  )
}

export default RootElement