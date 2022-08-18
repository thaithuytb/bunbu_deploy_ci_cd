"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const helloWould_1 = __importDefault(require("./controllers/helloWould"));
const todo_controller_1 = __importDefault(require("./controllers/todo.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname + '/publics')));
app.get('/todos', todo_controller_1.default.getTodos);
app.get('/', helloWould_1.default);
exports.default = app;
