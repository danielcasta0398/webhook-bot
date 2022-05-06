const capitalizarPalabras = ( val ) => {
  
    return val.toLowerCase()
              .trim()
              .split(' ')
              .map( v => v[0].toUpperCase() + v.substr(1) )
              .join(' ');  
  }  
 
module.exports = { capitalizarPalabras }  