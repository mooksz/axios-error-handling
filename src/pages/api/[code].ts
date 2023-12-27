// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Status code is missing" });
  }

  const statusCode = parseInt(code instanceof Array ? code[0] : code, 10);

  if (isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
    return res.status(400).json({ error: "Invalid status code" });
  }

  res
    .status(statusCode)
    .json({ message: `Response with status code ${statusCode}` });
}
