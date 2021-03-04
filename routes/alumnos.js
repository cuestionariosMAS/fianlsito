var express = require('express');
var router = express.Router();

var bd=require('./bd');



//Alta de registros
router.get('/alta', function(req, res, next) {
  res.render('altaalumnos');
});


router.post('/alta', function(req, res, next) {
      var registro={
          leg_alumno:req.body.leg_alumno,
          apyn_alumno:req.body.apyn_alumno,
          dom_alumno:req.body.dom_alumno,
          cod_postal:req.body.cod_postal,
          fecha_nac_alumno:req.body.fecha_nac_alumno,
          email_alumno:req.body.email_alumno,
          grupo_sang_alumno:req.body.grupo_sang_alumno,
          tel_fijo_alumno:req.body.tel_fijo_alumno,
          tel_movil_alumno:req.body.tel_movil_alumno,
          dni_alumno:req.body.dni_alumno
        };
      bd.query('insert into alumnos set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    
  res.render('mensajealumnos',{mensaje:'La carga se efectuo correctamente'});
});


//Listado de registros
router.get('/listado', function(req, res, next) {
  bd.query('select leg_alumno,apyn_alumno,dom_alumno,cod_postal,fecha_nac_alumno,email_alumno,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});


//Consulta
router.get('/consulta', function(req, res, next) {
  res.render('consultaalumnos');
});


router.post('/consulta', function(req, res, next) {
  bd.query('select leg_alumno,apyn_alumno,dom_alumno,cod_postal,fecha_nac_alumno,email_alumno,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where leg_alumno=?',req.body.leg_alumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('listadoconsulta',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe el legado de alumno ingresada'});
            }    
        });
});


//Modificacion
router.get('/modificacion', function(req, res, next) {
  res.render('consultamodificacion');
});


router.post('/modificar', function(req, res, next) {
  bd.query('select leg_alumno,apyn_alumno,dom_alumno,cod_postal,fecha_nac_alumno,email_alumno,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where leg_alumno=?',req.body.leg_alumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('formulariomodifica',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe el legado de alumno ingresada'});
            }    
        });
});


router.post('/confirmarmodifica', function(req, res, next) {
  var registro={
        leg_alumno:req.body.leg_alumno,
        apyn_alumno:req.body.apyn_alumno,
        dom_alumno:req.body.dom_alumno,
        cod_postal:req.body.cod_postal,
        fecha_nac_alumno:req.body.fecha_nac_alumno,
        email_alumno:req.body.email_alumno,
        grupo_sang_alumno:req.body.grupo_sang_alumno,
        tel_fijo_alumno:req.body.tel_fijo_alumno,
        tel_movil_alumno:req.body.tel_movil_alumno,
        dni_alumno:req.body.dni_alumno
      };    
  bd.query('UPDATE alumnos SET ? WHERE ?',[registro,{leg_alumno:req.body.leg_alumno}], function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                console.log(error);
                return;
            }
            res.render('mensajealumnos',{mensaje:'El alumno fue modificado'});
        });
});

router.get('/listara', function(req, res, next) {
  bd.query('select leg_alumno,apyn_alumno,dom_alumno,cod_postal,fecha_nac_alumno,email_alumno,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where cod_postal=7601',req.body.cod_postal, function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});

router.get('/listarb', function(req, res, next) {
  bd.query('select leg_alumno,apyn_alumno,dom_alumno,cod_postal,fecha_nac_alumno,email_alumno,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where fecha_nac_alumno between 20020101 and 20021231',req.body.fecha_nac_alumno, function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});

router.get('/listarc', function(req, res, next) {
  var con = {
    cod_postal:req.body.cod_postal,
    grupo_sang_alumno:req.body.grupo_sang_alumno  
  };
  bd.query("select * from alumnos where cod_postal='7601' and grupo_sang_alumno='rh-'",con, function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});

router.get('/listard', function(req, res, next) {
  bd.query('select * from alumnos order by dni_alumno asc',req.body.dni_alumno, function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});

router.get('/listare', function(req, res, next) {
  bd.query("select * from alumnos where dom_alumno='Avenida Juan B Justo'",req.body.dom_alumno, function(error,filas){
        if (error) {            
            console.log(error);
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});


module.exports = router;
