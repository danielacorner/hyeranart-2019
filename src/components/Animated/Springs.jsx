import React from "react"
import { useSpring, animated } from "react-spring/web.cjs" // web.cjs is required for IE 11 support
import { useMediaQuery } from "@material-ui/core"
import { BREAKPOINTS } from "../../utils/constants"

// https://material-ui.com/components/modal/
const TRANSLATE_UP_PX = 10
export const SpringInOut = React.forwardRef((props, ref) => {
  const {
    in: open,
    children,
    onEnter,
    onExited,
    widthPx,
    heightPx,
    ...other
  } = props

  const heightRatio = window.innerHeight / heightPx
  const widthRatio = window.innerWidth / widthPx

  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const scaleForMaxWidth =
    (isTabletOrLarger ? 0.8 : 0.9) * Math.min(heightRatio, widthRatio)
  const springScaleInOut = useSpring({
    from: {
      opacity: 0,
      transform: `scale(1) translateY(${TRANSLATE_UP_PX}px)`,
    },
    to: {
      opacity: open ? 1 : 0,
      transform: `scale(${open ? scaleForMaxWidth : 1}) translateY(${
        open ? 0 : TRANSLATE_UP_PX
      }px)`,
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div
      className="springUpDownWrapper"
      ref={ref}
      style={springScaleInOut}
      {...other}
    >
      {children}
    </animated.div>
  )
})
