

// npm run swagger-autogen
// https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284

// fuser -k -n tcp 3000
// $ lsof -i tcp:3000
// $ kill -9 PID
// npx kill-port 3000

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js','./controllers/scheduleController.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "127.0.0.1:3000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    Option:{

    },
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        },
        // petstore_auth: {
        //     type: "oauth2",
        //     authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
        //     flow: "implicit",
        //     scopes: {
        //         read_pets: "read your pets",
        //         write_pets: "modify pets in your account"
        //     }
        // }
    },
    definitions: {
       
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
    // require('./controllers/scheduleController.js')

})