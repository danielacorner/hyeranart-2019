import { graphql, useStaticQuery } from "gatsby"
import { GALLERY_SECTION_LINK } from "../components/Nav/SideNav"

export const useImagesQuery = () => {
  const data = useStaticQuery(graphql`
    query AllMarkdownQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              moreInfo
              externalLink
              width
              height
              date
              Image
              depth
              price
              saatchiLink
              pageIndex
              images {
                Image
              }
            }
          }
        }
      }
      allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              fluid(maxWidth: 1240) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const imagesArr = data.allFile.edges.map(({ node }) => ({
    ...node.childImageSharp.fluid,
    id: node.id,
    relativePath: node.relativePath,
  }))

  const allImagesDataArr = data.allMarkdownRemark.edges.map(
    ({ node }) => ({
      ...node.frontmatter,
      id: node.id,
      // find matching image in imagesArr
      fluid: !node.frontmatter.Image
        ? null
        : imagesArr.find(({ relativePath }) =>
            node.frontmatter.Image.includes(relativePath)
          ),
    })
  )

  // split into collections vs images
  const imagesDataArr = allImagesDataArr.filter(d => Boolean(d.fluid))

  const collectionsDataArr = allImagesDataArr
    .filter(d => Boolean(d.images && d.title !== GALLERY_SECTION_LINK.text))
    // sort by date, most recent first
    .sort(
      (prev, next) =>
        new Date(next.date).getTime() - new Date(prev.date).getTime()
    )

  const gallery = allImagesDataArr.find(d=>d.title===GALLERY_SECTION_LINK.text)
  const galleryImagesArr = gallery
    ? gallery.images.map(({ Image }) =>
        imagesDataArr.find(d => d.title === Image)
      )
    : []

  const sectionsDataArr = data.allMarkdownRemark.edges
    .map(d => d.node.frontmatter)
    .filter(d => Boolean(!d.images && !d.Image))
    // sort by pageIndex
    .sort((prev, next) => prev.pageIndex - next.pageIndex)

  return {
    imagesDataArr,
    collectionsDataArr,
    sectionsDataArr,
    imagesArr,
    galleryImagesArr,
  }
}
