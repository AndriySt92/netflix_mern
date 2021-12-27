import jwt from 'jsonwebtoken'
import express from 'express'
import { UserSchemaDocumentInterface } from './models/User'

export interface IGetUserAuthInfoRequest extends express.Request {
  user: UserSchemaDocumentInterface
}

export function verify(
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader: string | string[] | undefined = req.headers.token as string

  if (authHeader) {
    const token: string = authHeader.split(' ')[1]
    jwt.verify(
      token,
      //@ts-ignore
      process.env.SECRET_KEY,
      (err: jwt.VerifyErrors | null, user: jwt.JwtPayload | undefined) => {
        if (err) res.status(403).json('Token is not valid!')
        req.user = user as UserSchemaDocumentInterface
        next()
      },
    )
  } else {
    return res.status(401).json('You are not authenticated!')
  }
}
