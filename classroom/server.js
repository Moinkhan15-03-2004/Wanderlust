// const express = require("express");
// const app = express();
// const users = require("./routes/user.js"); // Use require to include the routes
// const posts = require("./routes/post.js");
// // const cookieParser = require('cookie-parser');
// const session = require("express-session");
// const flash = require("connect-flash");
// const path = require("path");

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// const sessionOptions = {
//     secret:"mysupersecretstring",
//     resave:false,
//     saveUninitialized:true,

// };

// app.use(session(sessionOptions));
// app.use(flash());
// app.get("/register",(req,res)=>{
//     let {name="anonymous"} = req.query;
//     req.session.name = name;
//     console.log(req.session.name);
//     res.flash("success","user registered successfully!");
//    res.redirect("/hello");
// })
// app.get("/hello",(req,res)=>{
//     res.render("page.ejs",{name:res.session.name});
//     res.send(`hello`);
// })
// // app.get("/reqcount",(req,res)=>{
// //     if(req.session.count){
// //         req.session.count++;
// //     }else{
        
// //         req.session.count = 1;
// //     }

// //     res.send(`You sent a request ${req.session.count} times`);
// // })

// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// })





// // // Use cookie-parser middleware
// // app.use(cookieParser("secretcode"));
// // app.get("/getsignedcookie",(req,res)=>{
// //     res.cookie("made-in","India",{signed:true});
// // res.send("signed cookie sent")
// // })
// // app.get("/verify",(req,res)=>{
// //     console.log(req.signedCookies);
// //     res.send("verify");
    
// // })


// // app.get("/greet",(req,res)=>{
// //     let {name ="anonymous"} = req.cookies;
// //     res.send(`Hi,${name}`);
// // })
// // app.get("/getcookies",(req,res)=>{
// //     res.cookie("greet","namaste");
// //     res.cookie("madeIn","India");
// //     res.send("send you some cookies");
// // })


// // app.get("/", (req, res) => {
// //     console.dir(req.cookies);
// //     res.send("Hi, I am root!");
// // });

// // // Use the routes from user.js
// // app.use("/users", users);
// // app.use("/posts",posts);



// app.listen(3000, () => {
// //     console.log("Server is listening on port 3000");
// });
const express = require("express");
const app = express();
const users = require("./routes/user.js"); // Use require to include the routes
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("error");
    res.locals.errorMsg = req.flash("success");
})

// Register route
app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;

    req.session.name = name;
    if(name === "anonymous"){
        req.flash("success", "User registered successfully!");
        
    }else{

        req.flash("error","user not registered");
    }
    
    
    // Use req.flash instead of res.flash
    res.redirect("/hello");
});

// Hello route
app.get("/hello", (req, res) => {
    // Render the 'page.ejs' template with the name from the session

   
    res.render("page.ejs", { name: req.session.name  });
});

// Test route
app.get("/test", (req, res) => {
    res.send("test successful");
});

// Uncomment and configure cookie-related routes as needed
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// });

// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

