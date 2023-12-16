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
const express_1 = __importDefault(require("express"));
// Import DB Connection
const index_1 = __importDefault(require("./../connection/index"));
const util_1 = __importDefault(require("util"));
const query = util_1.default.promisify(index_1.default.query).bind(index_1.default); // Handle Rollback Transaction
const router = express_1.default.Router();
router.get("/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield query(`SELECT * FROM admin`);
        res.status(200).send({
            error: false,
            message: "Success",
            data: findUser
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/admin-login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const findUser = yield query(`SELECT * FROM admin WHERE username='${username}' AND password='${password}'`);
        if (!findUser.length)
            return res.status(400).send({
                error: true,
                message: 'Login Failed',
                data: null
            });
        res.status(200).send({
            error: false,
            message: "Login Success",
            data: findUser[0]
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/admin-transaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startdate, enddate } = req.query;
        const findTransactions = yield query(`SELECT * FROM transactions WHERE createdAt >= '${startdate}' AND createdAt <= '${enddate}'`);
        res.status(200).send({
            error: false,
            message: 'Get All Transaction Success!',
            data: findTransactions
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/admin-income', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startdate, enddate } = req.query;
        const findTotal = yield query(`SELECT SUM(total) as total FROM transactions WHERE createdAt >= '${startdate}' AND createdAt <= '${enddate}';`);
        res.status(200).send({
            error: false,
            message: 'Get Total Income Success!',
            data: findTotal
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
