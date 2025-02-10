"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserJwtAdmin = exports.authenticateUserJwtUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userSecret = config_1.JWT_SECRET_CREATOR;
const adminSecret = config_1.JWT_SECRET_ADMIN;
const authenticateUserJwtUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            jsonwebtoken_1.default.verify(token, userSecret, (err, payload) => {
                if (err) {
                    return res.status(403).json({ message: "invalid token" });
                }
                if (!payload) {
                    return res.status(403).json({ message: "null payload" });
                }
                if (typeof payload == 'string') {
                    return res.status(403).json({ message: "payload is of type string" });
                }
                req.headers.userId = payload.userId;
                next();
            });
        }
        catch (err) {
            res.status(401).json({ message: "invalid token" });
        }
    }
    else {
        res.status(401).json({ message: "unauthorized" });
    }
};
exports.authenticateUserJwtUser = authenticateUserJwtUser;
const authenticateUserJwtAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            jsonwebtoken_1.default.verify(token, adminSecret, (err, payload) => {
                if (err) {
                    return res.status(403).json({ message: "invalid token" });
                }
                if (!payload) {
                    return res.status(403).json({ message: "null payload" });
                }
                if (typeof payload == 'string') {
                    return res.status(403).json({ message: "payload is of type string" });
                }
                req.headers.userId = payload.userId;
                next();
            });
        }
        catch (err) {
            res.status(401).json({ message: "invalid token" });
        }
    }
    else {
        res.status(401).json({ message: "unauthorized" });
    }
};
exports.authenticateUserJwtAdmin = authenticateUserJwtAdmin;
