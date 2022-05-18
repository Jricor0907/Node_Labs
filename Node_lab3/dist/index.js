"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.sendFile(path_1.default.resolve("views", "index.html"));
});
app.get("/leave", (_, res) => {
    res.sendFile(path_1.default.resolve("views", "leave.html"));
});
app.post("/create", (req, res) => {
    fs_1.default.writeFile('read.html', `<!DOCTYPE html><html lang="en"><head><title>Read</title></head><body><h1>read</h1><p>${req.body.note}</p></body></html>`, (err) => {
        if (err)
            throw err;
    });
    res.writeHead(302, {
        location: "http://localhost:8000/read",
    });
    res.end();
});
app.get("/read", (_, res) => {
    res.sendFile(path_1.default.resolve("read.html"));
});
app.get("/404", (_, res) => {
    res.sendFile(path_1.default.resolve("views", "404.html"));
});
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
