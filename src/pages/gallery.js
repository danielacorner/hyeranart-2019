import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Gallery from "../components/Masonry/Gallery"

export default () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Gallery />
    </Layout>
  )
}
