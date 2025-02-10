"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
//create a new order
router.post("/order", middleware_1.authenticateUserJwtUser, (req, res) => {
});
// get the details of specific order
router.get("/cart/:id", middleware_1.authenticateUserJwtUser, (req, res) => {
});
//get the list of order of  authenticated user
router.get("/orders", middleware_1.authenticateUserJwtUser, (req, res) => {
});
exports.default = router;
