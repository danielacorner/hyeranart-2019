import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Carousel from "../components/Carousel/Carousel"

// inspiration:
// https://abstractartcollective.com
// enter animations http://abstractartcollective.com/penny-arnst/

// http://bomomo.com/

// 3d tilt https://codepen.io/dimaZubkov/pen/XqoGeW

// https://www.npmjs.com/package/react-tilt

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Carousel />
    {/* <Link to="/works-large/">Large Works</Link>
    <Link to="/works-medium/">Medium Works</Link>
    <Link to="/works-small/">Small Works</Link> */}
  </Layout>
)

export default IndexPage
