const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bitacora_coachingv1'
});

//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("¡Conexión exitosa a la base de datos!")
    }
});

app.get('/', function(req,res){
    res.send('Ruta INICIO')
});

//Mostrar todos los coach
app.get('/api/coach', (req,res)=>{
    conexion.query('SELECT * FROM coach', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});

//bucar 1 solo coach
app.get('/api/coach/:rut_coach', (req,res)=>{
    conexion.query('SELECT * FROM coach WHERE rut_coach = ?', [req.params.rut_coach], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
});

//Crear un coach
app.post('/api/coach', (req,res)=>{
    let data = {nombre:req.body.nombre, rut_coach:req.body.rut_coach, email:req.body.email, password:req.body.password,  telefono:req.body.telefono}
    let sql = "INSERT INTO coach SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
});

//Editar coach
app.put('/api/coach/:rut_coach', (req, res)=>{
    
    let rut_coach   = req.params.rut_coach
    let nombre      = req.body.nombre
    let telefono    = req.body.telefono
    let email       = req.body.email
    let password    = req.body.password  
    let sql = "UPDATE coach SET  nombre = ?, telefono = ?, email = ?, password = ?  WHERE rut_coach = ?"
    
    conexion.query(sql, [nombre, telefono, email, password, rut_coach], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
});

//Eliminar coach
app.delete('/api/coach/:rut_coach', (req,res)=>{
    conexion.query('DELETE FROM coach WHERE rut_coach = ?', [req.params.rut_coach], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
});

//muestra datos de coachee
app.get('/api/coachee', (req,res)=>{
    conexion.query('SELECT * FROM coachee', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});

//crear coachee
app.post('/api/coachee', (req,res)=>{
    let data = {rut:req.body.rut, nombre:req.body.nombre, telefono:req.body.telefono, email:req.body.email, password:req.body.password, jefe_id_jefe:req.body.jefe_id_jefe}
    let sql = "INSERT INTO coachee SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
});

//Editar coachee
app.put('/api/coachee/:rut', (req, res)=>{
    
    let rut                 = req.params.rut
    let nombre              = req.body.nombre
    let telefono            = req.body.telefono
    let email               = req.body.email
    let password            = req.body.password
    let jefe_id_jefe        = req.body.jefe_id_jefe
    let sql = "UPDATE coachee SET nombre = ?, telefono = ?, email = ?, password = ?, jefe_id_jefe = ? WHERE rut = ?"
    
    conexion.query(sql, [nombre, telefono, email, password, jefe_id_jefe, rut], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
});

//Eliminar coachee
app.delete('/api/coachee/:rut', (req,res)=>{
    conexion.query('DELETE FROM coachee WHERE rut = ?', [req.params.rut], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
});

//muestra datos de supervisor
app.get('/api/jefe', (req,res)=>{
    conexion.query('SELECT * FROM jefe', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});

//crear supervisor
app.post('/api/jefe', (req,res)=>{
    let data = {id_jefe:req.body.id_jefe, telefono:req.body.telefono, nombre:req.body.nombre, email:req.body.email, empresa:req.body.empresa}
    let sql = "INSERT INTO jefe SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
});

//Editar supervisor
app.put('/api/jefe/:id_jefe', (req, res)=>{
    
    let id_jefe = req.params.id_jefe
    
    let telefono        = req.body.telefono
    let nombre          = req.body.nombre
    let email           = req.body.email
    let empresa         = req.body.empresa
    let sql = "UPDATE jefe SET telefono = ?, nombre = ?, email = ?, empresa = ? WHERE id_jefe = ?"
    
    conexion.query(sql, [telefono, nombre, email, empresa, id_jefe], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
});

//Eliminar supervisor
app.delete('/api/jefe/:id_jefe', (req,res)=>{
    conexion.query('DELETE FROM jefe WHERE id_jefe = ?', [req.params.id_jefe], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
});

app.get('/api/sesiones', (req,res)=>{
    conexion.query('SELECT * FROM sesiones', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});

// scrollbar coach y coachee gestor de sesiones
/*function selectCoach()
{
   app.select('/api/sesion/namecoach', (req,res)=>{
    conexion.query('select nombre from coach', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})
}
*//*
function selectCoachee()
{
   var seleeccion = conexion.query('select nombre from coachee')
   seleeccion.send(filas);
}*/
/***************************************************************************************************** */

//urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//directorio
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
})