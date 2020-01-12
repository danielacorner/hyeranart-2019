/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useRef, useContext } from "react"
import PropTypes from "prop-types"
import SideNav, { SIDENAV_WIDTH } from "../components/Nav/SideNav"
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../utils/constants"
import TopNav from "../components/Nav/TopNav"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import "./layout.css"
import { GlobalStateContext } from "../context/GlobalContextProvider"

export const SPRING_UP_DOWN_PX = 30

const LayoutStyles = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  main {
    width: 100vw;
    @media (min-width: ${BREAKPOINTS.TABTOP}px) {
      width: calc(100vw - ${SIDENAV_WIDTH}px);
    }
    height: 100%;
  }
`

const Layout = ({ children }) => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABTOP}px)`)
  const [isMounted, setIsMounted] = useState(true)
  const {isMovingDown} = useContext(GlobalStateContext)

  const navigateFnRef = useRef(() => null)

  const springExit = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: `translateY(${
      isMounted ? 0 : isMovingDown ? SPRING_UP_DOWN_PX : -SPRING_UP_DOWN_PX
    }px)`,
    config: { friction: 5, tension: 100, clamp: true },
    onRest: () => {
      if (!isMounted) {
        setIsMounted(true)
        navigateFnRef.current()
      }
    },
  })

  const handleNavigate = ({ navigateFn, idx }) => {
    navigateFnRef.current = navigateFn
    setIsMounted(false)
  }

  return (

    <LayoutStyles>
      {isTabletOrLarger ? (
        <SideNav handleNavigate={handleNavigate} />
        ) : (
          <TopNav handleNavigate={handleNavigate} />
          )}
      <animated.main style={springExit}>{children}</animated.main>
    </LayoutStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
