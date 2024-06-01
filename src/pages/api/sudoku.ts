// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const _response = await axios.get(
        "https://sudoku-api.vercel.app/api/dosuku"
    );
    return response.status(200).json(_response.data.newboard.grids[0]);
}

