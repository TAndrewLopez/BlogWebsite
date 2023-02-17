import { gql, GraphQLClient } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT as string;
const graphCMS_token = process.env.GRAPH_CMS_TOKEN as string;

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    if (req.method === 'POST') {
        const { name, email, slug, comment } = req.body;
        console.log(graphCMS_token)
        const graphQLClient = new GraphQLClient((graphqlAPI), {
            headers: {
                authorization: `Bearer ${graphCMS_token}`
            }
        })

        const query = gql`
            mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
                createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
                }
            `;

        try {
            const result = await graphQLClient.request(query, { name, email, slug, comment })
            return res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
}

export default handler

