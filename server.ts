import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    // securityDefinitions: {
    //   JWT: {
    //     type: 'apiKey',
    //     in: 'header',
    //     name: 'Authorization',
    //     description: "",
    //   }
    // }
  },
  basedir: __dirname, //app absolute path
  files: ['server.ts'] //Path to the API handle folder
};

expressSwagger(options)

/**
 * @route GET /hello1/:name
 * @group hello - hello to someone
 * @param {string} name.query.required - Will say hello to this name
 * @returns {object} 200 - Hello message to this name
 * @returns {Error}  default - Unexpected error
 */
app.get('/hello1/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello1, ${name} (GET)`);
});

// Notice: GET doesn't support request body, we should use POST
/**
 * @route POST /hello2
 * @group hello - hello to someone
 * @param {string} name.query.required - Will say hello to this name
 * @returns {object} 200 - Hello message to this name
 * @returns {Error}  default - Unexpected error
 */
app.post('/hello2', (req, res) => {
  const params = req.body as { name: string }
  res.send(`Hello2, ${params.name} (POST)`)
});

app.listen(3000, () => {
  console.log('listen on http://localhost:3000')
});


