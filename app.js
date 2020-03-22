const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();



app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
  res.render('index',{title: "qui prend quoi ? "});
});

app.post('/party', (req, res) => {
    axios
        .post(`${process.env.API_URL}/party`, req.body)
        .then(({data}) => res.redirect(`/party/${data._id}`)) // Le res.redirect permet de rediriger le processus vers une autre route.
        .catch((err) => res.send(err)); /// TODO@: FAIRE UNE 404
});

app.get('/party/:id', (req,res) => {
   // res.render('party', {title: 'page évent yooo '});
   axios
    .get(`${process.env.API_URL}/party/${req.params.id}`)
    .then(({ data }) =>
        res.render('party', {
        party: data,
        title: data.name,
        url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`,
    }),
  )
  .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () =>
  console.log(`Front app listening on port ${ process.env.PORT }!`),
);

