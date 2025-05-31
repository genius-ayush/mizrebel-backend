"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const product_1 = __importDefault(require("./routers/product"));
const category_1 = __importDefault(require("./routers/category"));
const cart_1 = __importDefault(require("./routers/cart"));
const collections_1 = __importDefault(require("./routers/collections"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_1.default); // done 
app.use('/user', user_1.default); //done
app.use('/product', product_1.default);
app.use('/category', category_1.default); // done 
app.use('/cart', cart_1.default);
app.use('/collections', collections_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
