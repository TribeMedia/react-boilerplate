/**
 * Created by gqadonis on 5/23/16.
 */
const express = require('express');
const request = require('superagent');

// Dev middleware
const addDevMiddlewares = (app, options) => {

  app.get('/loginUser', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    request.post('http://localhost:3030/auth/local')
      .type('application/json')
      .send({email:username, password: password})
      .end(function(err, response) {
        res.status(response.status).send(response.body);
      });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  app.get('/loginUser', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    request.post('http://localhost:3030/auth/local')
      .type('application/json')
      .send({email:username, password: password})
      .end(function(err, response) {
        res.status(response.status).send(response.body);
      });
  });
};

/**
 * Front-end middleware
 */
module.exports = (options) => {
  const isProd = process.env.NODE_ENV === 'production';

  const app = express();

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    addDevMiddlewares(app, options);
  }

  return app;
};
