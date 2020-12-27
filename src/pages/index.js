import React from "react"
import "./index.less"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { heartImg, rabbitIndexImg } from "../constants"

const IndexPage = () => {
  return (
    <div className="index-page">
      <div className="bg">
        <img className="rabbit" src={rabbitIndexImg} alt="这里有个兔子" />
        <img className="heart" src={heartImg} alt="这里有一些爱心" />
        <AniLink to="/input" swipe direction="left" top="entry" className="generate" unselectable="off">
          *开始生成我的2021*
        </AniLink>
      </div>
    </div>
  )
}

export default IndexPage
