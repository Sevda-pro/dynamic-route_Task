const express = require("express");
const fs=require("fs")
const app = express();
const port = 4000;

app.set("view engine", "hbs")

app.get("/", (req, res) => {
    res.render("home")
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/success", (req, res) => {
    res.render("success")
});
app.post("/contact",(req,res)=>{
    res.redirect("/success")
});
app.get("/prod1d",(req,res)=>{
    res.render("prod1detail")
})
app.get("/prod2d",(req,res)=>{
    res.render("prod2detail")
})

app.get("/cart", (req, res) => {
    fs.readFile("read.txt","utf-8", (err, data) => {
        if (err) {
            // Handle the error appropriately
            console.error(err);
            return res.status(500).send("Error reading file");
        }
        else{
            res.render("allprod", {
            products : `${data}` ,
        });
        }
    });
});
app.param('id', (req, res, next, id) => {
    fs.appendFile("read.txt", `${id}`, (err) => {
        if (err) {
            console.log(err);
        }
         });
    next();
});
app.get("/prodadded/:id?",(req,res)=>{
    res.redirect("/")
})

app.get('*', (req, res) => {
    res.render("404")
});


app.listen(port, () => {
    console.log(`Server is Woring on port: ${port}`);
});