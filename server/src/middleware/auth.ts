import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";


export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {

    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.USER_SECRET_KEY;
    if (secret) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            if (!user) {
                return res.sendStatus(403)
            }
            if (typeof user === "string") {
                return res.sendStatus(403)
            }
            req.headers.user = user.id
            next();
        })
    }
}

export const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {

    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ADMIN_SECRET_KEY;
    if (secret) {
        jwt.verify(token, secret, (err, admin) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!admin) {
                return res.sendStatus(403)
            }
            if (typeof admin === "string") {
                return res.sendStatus(403)
            }
            req.headers.user = admin.id;
            next();
        })
    }

}
