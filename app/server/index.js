const express = require('express');

const app = express()//create a express application

app.get('/', (req,res) =>{
    res.send("this is main page")
})


app.listen(3000, ()=>{
    console.log('listen on port 3000')
})