const rateLimit = require('express-rate-limit'); 
const corsOptions = {
    origin : function (origin, callback) {
        if (process.env.LISTABLANCA.indexOf(origin)){
            callback (null, true)
        }else {
            callback( new Error('El acceso no esta permitido desde tu dirección'))
        }
    }
}
const limiter = rateLimit({
    //Limite de acceso 20 minutos
    windowMs: 20 * 60 * 1000, 
    //Limite de intentos para acceder
    max: 100, 
    message: 'Excediste los intentos. Estarás bloqueado por 20 minutos'
});
module.exports = {corsOptions, limiter}