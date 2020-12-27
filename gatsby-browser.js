import RootElement from "./src/root"
import { Helmet } from "react-helmet"

const React = require("react")

export const wrapRootElement = ({ element }) => {
  const coverImage = new Image(410, 410)
  coverImage.src = "https://cdn.jsdelivr.net/gh/dcalsky/bbq/rabbit/cover.png"
  const wrapper = document.createElement("div")
  wrapper.appendChild(coverImage)
  wrapper.style.display = "none"
  document.body.appendChild(wrapper)
  return (
    <RootElement element={element} />
  )
}

export const wrapPageElement = ({ element }) => {

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>我的2021关键词</title>
        <meta name="description" content="两米兔|2021|关键词|新年" />
        <script src="https://hm.baidu.com/hm.js?e50e1c1cac50735db8706c8c72902203" />
      </Helmet>
      {element}
    </div>
  )
}

