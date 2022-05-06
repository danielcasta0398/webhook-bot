const {WebhookClient} = require('dialogflow-fulfillment');
const { capitalizarPalabras } = require('../utils/capitalizarParagraph');
const { createUsers, getUser } = require('./userController');

const dialog = (req, res) => { 
    
    const agent = new WebhookClient({ request : req, response: res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
   
    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }
   
    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }
    
    const registro = (agent) => {        
    
     const name = agent.parameters.name
     const email = agent.parameters.email
           
     agent.add(`Hola quieres registrar estos datos\n\n*Nombre:* ${capitalizarPalabras(name)}\n*Correo:* ${email}\n\nTus Datos estan Correctos *SI* o *NO*`);      
    
    }  

    function registerYes(agent) {       

        const name = agent.parameters.name
        const email = agent.parameters.email       
          
        createUsers(name,email)   

        agent.add(`✅ Tus datos se registraron correctamente`);        
      }

      const login = async (agent) => {     
        
        const email = agent.parameters.email 
        const res = await getUser(email)      
        

        if (!res) {
         return agent.add(`No tienes registro`);      
        } else{
            const name = res.dataValues.name
            agent.add(`Hola de nuevo *${capitalizarPalabras(name)}*`);   
        }               
             
      }  
  
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('registrarme', registro);
    intentMap.set('registrarme - yes', registerYes);
    intentMap.set('login', login);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);

    
    
  }

module.exports = { dialog }

 

