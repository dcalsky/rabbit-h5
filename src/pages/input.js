import React, { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import smileSVG from "../images/smile-fill.svg"
import calendarSVG from "../images/calendar-fill.svg"
import * as Sentry from "@sentry/react"
import zh from "date-fns/locale/zh-CN"
import "./input.less"
import { navigate } from "gatsby"
import { my2021Img, rabbitBottomImg } from "../constants"

registerLocale("zh", zh)

const InputPage = () => {
  const [startDate, setStartDate] = useState()
  const handleDateChangeRaw = (e) => {
    e.preventDefault()
  }
  const [username, setUsername] = useState()
  const navigateToResult = () => {
    if (!username || username.trim() === "") {
      alert("名字不能为空")
      return
    }
    if (!startDate) {
      alert("请选择一个生日")
      return
    }
    localStorage.setItem("username", username)
    const state = {
      username,
      startDate
    }
    const transaction = Sentry.startTransaction({ name: "generate" })
    transaction.setData("username", username)
    transaction.setData("birthday", startDate.getFullYear())
    transaction.finish()
    navigate("/result", {
      state
    })
  }
  return (
    <div className="input-page">
      <div className="bg">
        <img className="bottom-rabbit" src={rabbitBottomImg} />
        <div className="controls">
          <div className="title-box">
            <img className="title" src={my2021Img} alt="2021" />
          </div>
          <div className="control">
            <img className="icon" src={smileSVG} />
            <input type="text" placeholder="输入你的名字" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="control">
            <img className="icon" src={calendarSVG} />
            <DatePicker
              selected={startDate}
              dateFormat="yyyy年"
              onChange={date => setStartDate(date)}
              showYearPicker
              showYearDropdown
              maxDate={new Date()}
              locale="zh"
              placeholderText="选择你的生日"
              onChangeRaw={handleDateChangeRaw}
              customInput={<input type="text" />}
            />
          </div>
          <button onClick={navigateToResult} className="generate" unselectable="off">
            *一键生成*
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputPage
