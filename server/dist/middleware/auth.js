var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
export const verifyUserToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.USER_SECRET_KEY;
    if (secret) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === "string") {
                return res.sendStatus(403);
            }
            req.headers.user = user.id;
            next();
        });
    }
};
export const verifyAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ADMIN_SECRET_KEY;
    if (secret) {
        jwt.verify(token, secret, (err, admin) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!admin) {
                return res.sendStatus(403);
            }
            if (typeof admin === "string") {
                return res.sendStatus(403);
            }
            req.headers.user = admin.id;
            next();
        });
    }
});
