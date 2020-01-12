import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PaintingStack from "../components/PaintingStack"

// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

// https://www.npmjs.com/package/react-tilt

export default () => (
  <Layout>
    <SEO title="Home" />
    <PaintingStack />
    {/* <Link to="/works-large/">Large Works</Link>
    <Link to="/works-medium/">Medium Works</Link>
    <Link to="/works-small/">Small Works</Link> */}
  </Layout>
)
