"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionRouter_1 = __importDefault(require("./router/transactionRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Body Parser
const PORT = 5000;
app.use("/api", transactionRouter_1.default);
app.listen(PORT, () => {
    console.log(`[SERVER] Server Running on Port : ${PORT}`);
});
