const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcyg9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello Database')
})



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const services = client.db("volunteerService").collection("services");
  const registeredServices = client.db("volunteerService").collection("registeredServices");

app.post('/registeredServices',(req,res)=>{
    registeredServices.insertOne(req.body)
    .then(result=>{
      
      res.send(result.insertedCount>0)
    })
  })
  app.get('/myRegistrations',(req,res)=>{
      registeredServices.find({email: req.query.email})
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

    app.get('/services', (req, res) => {
        services.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

});


app.listen(process.env.PORT || port)