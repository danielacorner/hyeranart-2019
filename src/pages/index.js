import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import SplashPageCover, {
  splashPageStyles,
} from "../components/SplashPageCover"
import { animated, useSpring } from "react-spring"
import { Portal } from "@material-ui/core"
import Gallery from "../components/Masonry/Gallery"

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}

export default () => {
  const [isSplashPageClicked, setIsSplashPageClicked] = useState(false)

  const toggleOverflowHidden = isHidden => {
    if (isHidden) {
      document.querySelector("html").classList.add("overflowHidden")
    } else {
      document.querySelector("html").classList.remove("overflowHidden")
    }
  }

  useEffect(() => {
    toggleOverflowHidden(true)
    return () => {
      toggleOverflowHidden(false)
    }
  })

  const springSplashPage = useSpring({
    opacity: isSplashPageClicked ? 0 : 1,
    transform: `translateY(${isSplashPageClicked ? -64 : 0}px)`,
    onRest: () => {
      // set pathname to /gallery so we don't have to go through the splash page again
      if (isSplashPageClicked) {
        toggleOverflowHidden(false)
      }
    },
  })

  const handleClick = () => {
    setIsSplashPageClicked(true)
  }

  return (
    <Layout>
      <SEO title="Home" />
        <Portal>
          <animated.div
            className="animatedWrapper splashPage"
            style={{
              ...splashPageStyles,
              ...springSplashPage,
              ...(isSplashPageClicked
                ? {
                    pointerEvents: "none",
                  }
                : {}),
            }}
          >
            <SplashPageCover
              isClicked={isSplashPageClicked}
              handleClick={handleClick}
            />
          </animated.div>
        </Portal>
        <Gallery/>
    </Layout>
  )
}
