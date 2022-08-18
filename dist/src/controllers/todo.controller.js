"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoController {
    static getTodos(req, res) {
        const todos = [
            {
                id: 1,
                name: 'run',
                complete: false,
            },
            {
                id: 2,
                name: 'eat',
                complete: false,
            },
            {
                id: 2,
                name: 'fly',
                complete: false,
            },
        ];
        return res.status(200).json(todos);
    }
}
exports.default = TodoController;
