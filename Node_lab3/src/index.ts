import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res.sendFile(path.resolve("views", "index.html"));
});

app.get("/leave", (_: Request, res: Response) => {
  res.sendFile(path.resolve("views", "leave.html"));
});

app.post("/create", (req: Request, res: Response) => {
  fs.writeFile(
    "read.html",
    `<!DOCTYPE html><html lang="en"><head><title>Read</title></head><body><h1>read</h1><p>${req.body.note}</p></body></html>`,
    (err) => {
      if (err) throw err;
    }
  );
  res.writeHead(302, {
    location: "http://localhost:8000/read",
  });
  res.end();
});

app.get("/read", (_: Request, res: Response) => {
  res.sendFile(path.resolve("read.html"));
});

app.get("/404", (_: Request, res: Response) => {
  res.sendFile(path.resolve("views", "404.html"));
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
