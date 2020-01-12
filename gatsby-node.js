/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { kebabCase } = require("lodash")
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const collectionPageTemplate = path.resolve(
    `src/templates/collectionTemplate.jsx`
  )
  const sectionPageTemplate = path.resolve(`src/templates/sectionTemplate.jsx`)

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
              saatchiLink
              pageIndex
              moreInfo
              Image
              images {
                Image
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // section pages
    if (Boolean(!node.frontmatter.images && !node.frontmatter.Image)) {
      const { title, moreInfo, pageIndex } = node.frontmatter
      createPage({
        path: `/${kebabCase(node.frontmatter.title)}`,
        component: sectionPageTemplate,
        context: {
          title,
          moreInfo,
          pageIndex,
        }, // additional data can be passed via context
      })
    }

    // collection pages
    if (Boolean(node.frontmatter.images)) {
      const { saatchiLink, moreInfo, images, title, date } = node.frontmatter
      createPage({
        path: `/collections/${kebabCase(node.frontmatter.title)}`,
        component: collectionPageTemplate,
        context: {
          title,
          images,
          saatchiLink,
          moreInfo,
          date,
        }, // additional data can be passed via context
      })
    }
  })
}

// convert markdown to html (e.g. moreInfo section)
const remark = require("remark")
const remarkHTML = require("remark-html")

exports.onCreateNode = ({ node }) => {
  if (!node.frontmatter) {
    return node
  }
  const markdown = node.frontmatter.moreInfo
  if (markdown) {
    node.frontmatter.moreInfo = remark()
      .use(remarkHTML)
      .processSync(markdown)
      .toString()
  }
  return node
}
