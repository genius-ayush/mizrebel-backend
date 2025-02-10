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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient;
// get user details (admin only or authenticated user)
router.get("/users/:id", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield prismaClient.user.findFirst({
            where: { id: parseInt(id, 10) }
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: "unable to get user details" });
    }
}));
router.get("/users", middleware_1.authenticateUserJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    if (typeof (userId) == 'number') {
        try {
            const user = yield prismaClient.user.findFirst({
                where: { id: userId }
            });
            res.status(200).json(user);
        }
        catch (err) {
            res.status(400).json({ message: "unable to get user details" });
        }
    }
    else {
        res.status(500).json({ message: "unable to get user details if else" });
    }
}));
// update user details 
router.patch("/users/:id", middleware_1.authenticateUserJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    try {
    }
    catch (err) {
        res.status(400).json("unable to update user details");
    }
}));
exports.default = router;
