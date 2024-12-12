const express = require('express')
const cors = require('cors')



const axios = require('axios');
const { giftRouter } = require('./controller/gift.controller');

const app = express();
app.use(cors())


const port = process.env.PORT || 3002;
app.use(express.json());

app.use("/api/v1/gifts", giftRouter)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})



