const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app =express();
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));

let string =[];
let newTitle= "";

let message = [];
let newmessage="";

const email = "123@gmail.com";
const password = "123";

app.get("/", function (req,res){
    res.sendFile(__dirname+ "/login.html");
});

app.post("/",function(req, res){
     let details = req.body;
    if(req.body.inputEmail === email && req.body.inputPassword === password){
        res.render("discussionList",{title :string});
    }
    else{
        res.redirect("/");
    }
     
});

app.get("/discussionList",function(req, res){
    res.render("discussionList",{title :string});
   
});


app.post("/discussionList", function(req, res){
    
     newTitle = req.body.comment;
    
    string.push(newTitle);

    res.redirect("/discussionList");

});





app.get("/discussion", function(req, res){
    
    res.render("discussion",{message: message, title: req.query.title});
});

app.post("/discussion", function(req, res){
    newmessage = req.body.message;
    message.push(newmessage);
    res.redirect("/discussion");
})




app.listen(process.env.PORT||3000,function(response){
    console.log("Server has started");
});