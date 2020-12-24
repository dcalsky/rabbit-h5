import React from "react"
import "./index.less"
import rabbitSVG from "../images/rabbit-index.svg"
import heartSVG from "../images/heart.svg"
import { navigate } from "gatsby"

const IndexPage = () => {
  return (
    <div className="index-page">
      <div className="bg">
        <img className="rabbit" src={rabbitSVG} alt="这里有个兔子" />
        <img className="heart" src={heartSVG} alt="这里有一些爱心" />
        <button unselectable={true} className="generate" onClick={() => {
          navigate(
            "/input/",
            {}
          )
        }}>*开始生成我的2021*
        </button>
      </div>
    </div>
  )
}

export default IndexPage
