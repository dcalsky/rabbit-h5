import React, { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import smileSVG from "../images/smile-fill.svg"
import calendarSVG from "../images/calendar-fill.svg"
import bottomRabbitSVG from "../images/2m.png"
import zh from "date-fns/locale/zh-CN"
import my2021 from "../images/my2021.png"
import "./input.less"

registerLocale("zh", zh)

const InputPage = () => {
  const [startDate, setStartDate] = useState()
  const handleDateChangeRaw = (e) => {
    e.preventDefault()
  }
  return (
    <div className="input-page">
      <div className="bg">
        <img className="bottom-rabbit" src={bottomRabbitSVG} />
        <div className="controls">
          {/*<div className="title">我的2021<span className="subtitle">@两米兔</span></div>*/}
          <div className="title-box">
            <img className="title" src={my2021} alt="" />
          </div>

          <div className="control">
            <img className="icon" src={smileSVG} />
            <input type="text" placeholder="输入你的名字" />
          </div>
          <div className="control">
            <img className="icon" src={calendarSVG} />
            <DatePicker
              selected={startDate}
              dateFormat="yyyy年MM月"
              onChange={date => setStartDate(date)}
              showMonthYearPicker
              locale="zh"
              placeholderText="选择你的生日"
              onChangeRaw={handleDateChangeRaw}
              customInput={<input type="text" />}
            />
          </div>
          <button unselectable="off" className="generate">*一键生成*</button>
        </div>

      </div>
    </div>
  )
}

export default InputPage
