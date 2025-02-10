"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userSecret = config_1.JWT_SECRET_CREATOR;
const adminSecret = config_1.JWT_SECRET_ADMIN;
const prismaClient = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield prismaClient.user.findFirst({
        where: {
            email
        }
    });
    if (existingUser) {
        res.status(403).json({ message: "user already exist" });
    }
    else {
        try {
            const user = yield prismaClient.user.create({
                data: {
                    name,
                    email,
                    passwordHash: password,
                }
            });
            const token = jsonwebtoken_1.default.sign({
                userId: user.id
            }, userSecret);
            res.status(201).json({
                token, userId: user.id, message: "user create successfully"
            });
        }
        catch (err) {
            res.status(550).json({ error: "failed to register user", details: err });
        }
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                email: email,
                passwordHash: password
            }
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id
            }, userSecret);
            res.status(200).json({ token, userId: user.id, message: "user logged successfully" });
        }
        else {
            res.status(401).json("wrong username or password");
        }
    }
    catch (err) {
        res.status(550).json({ error: "failed to login user", details: err });
    }
}));
router.post('/adminRegister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const existingUser = yield prismaClient.user.findFirst({
        where: {
            email
        }
    });
    if (existingUser) {
        res.status(403).json({ message: "ADMIN already exist" });
    }
    else {
        try {
            const user = yield prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    passwordHash: password,
                    role: 'ADMIN',
                }
            });
            const token = jsonwebtoken_1.default.sign({
                userId: user.id
            }, adminSecret);
            res.status(201).json({
                token, userId: user.id, message: "Admin create successfully"
            });
        }
        catch (err) {
            res.status(550).json({ error: "failed to register admin", details: err });
        }
    }
}));
router.post('/adminLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                email: email,
                passwordHash: password
            }
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id
            }, adminSecret);
            res.status(200).json({ token, userId: user.id, message: "user logged successfully" });
        }
        else {
            res.status(401).json("wrong username or password");
        }
    }
    catch (err) {
        res.status(550).json({ error: "failed to login user", details: err });
    }
}));
exports.default = router;
