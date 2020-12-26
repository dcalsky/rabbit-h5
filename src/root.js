import { useEffect, useState } from "react"
import React from "react"
import "./root.less"
import ReactLoading from "react-loading"
import { Helmet } from "react-helmet"

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
    "2m.png"
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
    const script = document.createElement("script")

    script.src = "https://hm.baidu.com/hm.js?e50e1c1cac50735db8706c8c72902203"
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    <div className="root">
      <Helmet>
        <meta charSet="utf-8" />
        <title>我的2021关键词</title>
        <meta name="description" content="两米兔|2021|关键词|新年" />
      </Helmet>
      {
        loading ?
          <div>
            <ReactLoading className="loading" type="balls" width="300px" />
            <h1>加载中</h1>
          </div>
          :
          element
      }
    </div>
  )
}

export default RootElement