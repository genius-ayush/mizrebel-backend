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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient;
router.get("/collections/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (parseInt(id, 10) == 9) {
            const collections = yield prismaClient.product.findMany();
            res.status(200).json(collections);
        }
        else {
            const collections = yield prismaClient.product.findMany({
                where: {
                    categoryId: parseInt(id, 10)
                }
            });
            res.status(200).json(collections);
        }
    }
    catch (error) {
        res.status(400).json({ message: "unable to fetch collections", error });
    }
}));
exports.default = router;
