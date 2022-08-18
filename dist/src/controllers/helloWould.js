"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloWould = (req, res) => {
    res.status(200);
    res.json('Hello would !!!');
};
exports.default = helloWould;
