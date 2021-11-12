const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nxcc7.mongodb.net/${process.env.DB_NAME}retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()



app.use(bodyParser.json())
app.use(cors())



client.connect(err => {
  const clientReviewCollection = client.db("revolutionInternetServiceDatabase").collection("reviewsCollection");
  app.post('/addReview', (req, res)=>{
    const review = req.body;
    clientReviewCollection.insertOne(review)
    .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount)
    })

  })

      app.get('/review', (req, res) => {
        clientReviewCollection.find({})
        .toArray((err, documents)=>{
          res.send(documents)
        })
      })

});


app.get('/', (req, res) => {
  res.send('Hy This is Jewel')
})

app.listen(process.env.PORT || port)