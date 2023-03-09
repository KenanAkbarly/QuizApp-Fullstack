const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require('./config/dbConfig')
const path = require('path');

const usersRoute = require('./routes/usersRoute');
const examsRoute = require('./routes/exmasRoute');
const reportsRoute = require('./routes/reportsRoute');

app.use('/api/users', usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports",reportsRoute);

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})