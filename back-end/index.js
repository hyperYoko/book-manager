import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json())

const dbConfig = {
    host:"localhost",
    user:"root",
    password:"root",
    database:"bookmanager"
}
const db = mysql.createConnection(dbConfig);

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM `books`"
    db.query(q,(err,data)=>{
        if(err) { console.log(err); return res.json(err); }
        return res.json(data);
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO `books`(`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q,[values],(err,data)=>{
        if(err) { return res.send(err); }
        return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const q = "DELETE FROM `books` WHERE `id` = ?";
    db.query(q, [req.params.id],(err,data)=>{
        if(err) { return res.send(err); }
        return res.json(data);
    })
})

app.put("/books/:id",(req,res)=>{
    const q = "UPDATE `books` SET `title` = ?,`desc` = ?,`price` = ?,`cover` = ? WHERE `id` = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
        req.params.id
    ]
    db.query(q,[...values],(err,data)=>{
        if(err) { return res.send(err); }
        return res.json(data);
    })
})

app.listen(8080,()=>{console.log("Webserver at port 8080")});
