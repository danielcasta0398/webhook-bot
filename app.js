const express = require('express');
const { webhookRoutes } = require('./routes/webhookRouter');
const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { db } = require('./utils/databases');


const client = new Client();
const app = express();

app.use(express.json());

app.use( '/api/v1/users', webhookRoutes)
   
db.authenticate()
  .then(() => console.log('Successful connection to Databases'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));


const PORT = 4003

app.listen(PORT, () =>{
    console.log(`Running server PORT ${PORT}`);
})


/*client.on('qr', qr => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true}) 
});


client.on('ready', () => {
    console.log('Client is ready!');
});

const mensaje = client.on('message', message => {
    const number = '34641009503@c.us'
	
    if(!message.body){
        client.sendMessage(number, 'pong');      
    }
	
    
});

client.initialize();*/

module.exports = { client }