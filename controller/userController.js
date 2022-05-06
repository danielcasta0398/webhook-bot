const { AgentsClient } = require("@google-cloud/dialogflow/build/src/v2beta1");
const { User } = require("../model/usersModel");

const createUsers = async (name, email) => {
       
  
      const newUser = await User.create({
        name,
        email,        
        
      });
  
  
  };


  const getUser = async (email) => {
      
    const user = await User.findOne( {where: {email}} )
    
    return user

  }

module.exports = {createUsers, getUser}