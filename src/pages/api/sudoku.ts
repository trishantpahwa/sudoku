// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const difficulty = request.query.difficulty ?? "easy";
    const _response = await axios.get(
        `https://sugoku.onrender.com/board?difficulty=${difficulty}`
    );
    return response.status(200).json(_response.data);
}

