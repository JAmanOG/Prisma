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
const prisma = new client_1.PrismaClient();
function insertUser(email, username, password, fullname) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email,
                username,
                password,
                fullname,
            },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                fullname: true,
            },
        });
        console.log(res);
    });
}
function updateUser(id, email, username, password, fullname) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
                username,
                password,
                fullname,
            },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                fullname: true,
            },
        });
        console.log(res);
    });
}
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        console.log(user);
    });
}
// getUser("AmanOG");
// insertUser("jaman5763@gmail.com", "Aman", "123456", "Aman Jaiswal")
// updateUser(2, "jaman@gmail.com", "AmanOG", "123456", "Aman Jaiswal")
// Relationship
function createTodo(user_id, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todos.create({
            data: {
                title,
                description,
                user_id,
            },
        });
        console.log(todo);
    });
}
// createTodo(1, "go to gym", "go to gym and do 10 pushups");
function getTodos(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todos.findMany({
            where: {
                user_id: user_id,
            },
        });
        console.log(todos);
    });
}
// getTodos(1);
// one way to do this 
function getTodosAndUserDetails(user_Id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: user_Id
            }
        });
        const todos = yield prisma.todos.findMany({
            where: {
                user_id: user_Id,
            }
        });
        console.log(todos);
        console.log(user);
    });
}
// getTodosAndUserDetails(1);
// better way to do this
function getTodosAndUserDetailss(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todos.findMany({
            where: {
                id: user_id,
            },
            select: {
                user: true,
                title: true,
                description: true
            }
        });
        console.log(todos);
    });
}
getTodosAndUserDetailss(1);
