import RootElement from "./src/root"

const React = require("react")

export const wrapRootElement = ({ element }) => {
  return (
    <RootElement element={element} />
  )
}
