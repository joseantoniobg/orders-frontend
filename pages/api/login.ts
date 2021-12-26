import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../config/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    const { login, password } = req.body;
    const tokenRes = await api
      .post(
        "/auth/token",
        {
          client_id: login,
          client_secret: password,
          grant_type: "client credentials",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((e) => {
        res
          .status(e.response.status)
          .json({ message: e.response.data.message });
      });

    if (tokenRes) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", tokenRes.data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 3600,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: tokenRes.data.user });
    }
  }
};
