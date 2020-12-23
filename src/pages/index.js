import React from "react"
import "./index.less"
import rabbitIndex from "../images/rabbit-index.png"


const IndexPage = () => (

  <>
    <div className="bg">
      <img className="rabbit" src={rabbitIndex} alt="这里有个兔子" />
      <button className="generate">*开始生成我的2021*</button>
    </div>
  </>
)

export default IndexPage
