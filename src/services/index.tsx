import { request, gql } from "graphql-request";
const graphqlAPI = process.env.GRAPH_CMS_ENDPOINT as string;

export const getPosts = async () => {
  const query = gql`
    query Assets {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};