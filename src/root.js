import { useEffect, useState } from "react"
import React from "react"
import "./root.less"
import ReactLoading from "react-loading"

const imagesCache = {}

const RootElement = ({ element }) => {
  const [loading, setLoading] = useState(true)
  const importImages = async () => {
    const importAll = requireContext => requireContext.keys().forEach(key => imagesCache[key] = requireContext(key))
    importAll(require.context("./images/", false, /\.(svg)|(png)$/))
    await Promise.all(Object.keys(imagesCache).map(key => {
      const img = new Image(1, 1)
      img.src = imagesCache[key]
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