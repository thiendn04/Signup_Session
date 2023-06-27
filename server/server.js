import express from 'express'
import mysql from 'mysql';
import cors from 'cors';
// import { check, validationResult, cookie } from 'express-validator';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 24
    }
}))
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "signup"
})

app.get('/', (req, res) => {
    if(req.session.name) {
        return res.json({valid: true, name: req.session.name})
    } else {
        return res.json({valid: false})
    }
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
        if(err) return res.json({Message: "Error inside server"});
        if(data.length > 0) {
            req.session.name = data[0].name;
            return res. json({Login: true})
        } else {
            return res.json({Login: false})
        }
    })
})
app.listen(8081, ()=> {
    console.log("listening");
})