const express = require('express');
const app = express();

console.log(process.env)

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);



// retrieve all papers from the database
app.get('/api/v1/papers', (request, response) => {
  database('papers').select()
    .then(papers => {
      return response .status(200).json(papers);
    })
    .catch(err => response.status(500).json(err))
});

// retrieve a single paper from the database
app.get('/api/v1/papers/:id', (request, response) => {
  database('papers').where('id', request.params.id).select()
    .then(paper => {
      return response .status(200).json(paper[0]);
    })
    .catch(err => response.status(500).json(err))
});

// create a new paper
app.post('/api/v1/papers', (request, response) => {
  // const paper = request.body;
// setup body parser
  // database('papers').insert(paper, )
});

app.listen(3000, () => {
  console.log('Listening on port 3000 for papers');
});

// /api/v1/papers/:id/footnotes
// /api/v1/papers
// /api/v1/papers/:id
// /api/v1/footnotes
// /api/v1/footnotes/id:
