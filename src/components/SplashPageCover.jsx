import React from "react"
import styled from "styled-components"
import { Button } from "@material-ui/core"

export const splashPageStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9999,
}
const SplashPageStyles = styled.div`
  height: 100%;
  background: hsl(0, 0%, 80%);
  overflow: hidden;
  display: grid;
  align-items: center;
  justify-items: center;
  .titleWrapper {
    margin-top: -3em;
    display: grid;
    place-items: center center;
  }
`

const SplashPageCover = ({ handleClick }) => {
  return (
    <SplashPageStyles>
      <div className="titleWrapper">
        <h1>Hyeran</h1>
        <div className="btnWrapper">
          <Button onClick={handleClick}>Enter</Button>
        </div>
      </div>
    </SplashPageStyles>
  )
}

export default SplashPageCover
