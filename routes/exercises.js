const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/exercise-one', async (req,res) => {
    try {
        let data = await db.any('SELECT * FROM cd_facilities');
        res.status(200).json(data);
    } catch (error) {
        res.send('Error en la petición');
    }
    /**db.any("SELECT * FROM cd_facilities")
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
        })**/
});

router.get('/exercise-two', async (req,res) => {
    try {
        let data = await db.any('SELECT name, membercost FROM cd_facilities');
        res.status(200).json(data);
    } catch (error) {
        res.send('Error en la petición');
    }
    /**db.any("SELECT name, membercost FROM cd_facilities")
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
        })**/
});

router.get('/exercise-three/:value', async (req,res) => {
    const value = parseInt(req.params.value);
    try {
        let data = await db.any('SELECT * FROM cd_facilities WHERE membercost > $1',value);
        if(data.length > 0){
            res.status(200).json(data);
        } else {
            res.send('No se han encontrado resultados, ingrese otro parámetro')
        }
    } catch (error) {
        console.log(error);
    }
    /**db.any("SELECT * FROM cd_facilities WHERE membercost > $1",value)
        .then(data => {
            if(data.length>0){
                res.status(200).json(data);
            } else {
                res.send('No se han encontrado resultados, ingrese otro parámetro');
            }
            
        })
        .catch(err => {
            console.log(err);
        })**/
});

router.get('/exercise-four/:value', (req,res) => {
    const value = parseInt(req.params.value);
    db.any("SELECT facid, name, membercost, monthlymaintenance FROM cd_facilities WHERE membercost > $1 AND membercost < monthlymaintenance*0.02",value)
        .then(data => {
            if(data.length>0){
                res.status(200).json(data);
            } else {
                res.send('No se han encontrado resultados, ingrese otro parámetro');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/exercise-five/:value', (req,res) => {
    const value = req.params.value;
    db.any(`SELECT * FROM cd_facilities WHERE name LIKE '%${value}%'`)
        .then(data => {
            if(data.length>0){
                res.status(200).json(data);
            } else {
                res.send('No se han encontrado resultados, ingrese otro parámetro');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/exercise-seven/:value', (req,res) => {
    const value = parseInt(req.params.value);
    db.any(`SELECT name, case when (monthlymaintenance > ${value}) 
            then 'expensive'
            else 'cheap' end 
            as cost FROM cd_facilities`)
        .then(data => {
            if(data.length>0){
                res.status(200).json(data);
            } else {
                res.send('No se han encontrado resultados, ingrese otro parámetro');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/exercise-nine/:value', (req,res) => {
    const value = parseInt(req.params.value);
    db.any(`SELECT DISTINCT surname FROM cd_members ORDER BY surname FETCH FIRST ${value} ROWS ONLY`)
        .then(data => {
            if(data.length>0){
                res.status(200).json(data);
            } else {
                res.send('No se han encontrado resultados, ingrese otro parámetro');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;