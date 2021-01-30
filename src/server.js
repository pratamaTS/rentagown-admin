const express = require('express');
const corsOptions ={
  origin:'http://absdigital.id:5000',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
const cors = require('cors');
const app = express();

app.use(cors(corsOptions));
