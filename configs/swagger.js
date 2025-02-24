import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"1.0.0",
        info:{
            title: "Gestor de opiniones API",
            version: "1.0.0",
            description: "API para un gestor de opiniones",
            contact:{
                name: "Erick Socop",
                email: "esocop-2023011@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/socialmedia/v1"
            }
        ]
    },
    apis:[
        
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}