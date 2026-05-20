
import express from "express";
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.use(
    cors({
    origin: "http://localhost :3000",
    Credential: true,
    methods: ['GET','POST','DELETE','OPTIONS'],
    allowHeaders :['Content-Type' , 'Authorizationn']
    })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT || 4000;

app.get("/",(req,res) => {
    res.send("Hello World");
});

console.log(process.env.PORT);
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
});