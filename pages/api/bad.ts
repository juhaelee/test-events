import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  fetch("https://us-east-1.hightouch-events.com/v1/track", {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.HIGHTOUCH_API_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userId: "1",
      event: "Oder Complted",
      properties: {},
      context: {},
    }),
  });

  res.json({ message: "Hello Everyone!" });
}
