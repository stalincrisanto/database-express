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
});

router.get('/exercise-two', async (req,res) => {
    try {
        let data = await db.any('SELECT name, membercost FROM cd_facilities');
        res.status(200).json(data);
    } catch (error) {
        res.send('Error en la petición');
    }
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
});

router.get('/exercise-four/:value', async (req,res) => {
    const value = parseInt(req.params.value);
    try {
        let data = await db.any("SELECT facid, name, membercost, monthlymaintenance FROM cd_facilities WHERE membercost > $1 AND membercost < monthlymaintenance*0.02",value)
        if(data.length > 0){
            res.status(200).json(data);
        } else {
            res.send('No se han encontrado resultados, ingrese otro parámetro')
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/exercise-five/:value', async (req,res) => {
    const value = req.params.value;
    try {
        let data = await db.any(`SELECT * FROM cd_facilities WHERE name LIKE '%${value}%'`)
        if(data.length > 0){
            res.status(200).json(data);
        } else {
            res.send('No se han encontrado resultados, ingrese otro parámetro')
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/exercise-seven/:value', async (req,res) => {
    const value = parseInt(req.params.value);
    try {
        let data = await db.any(`SELECT name, case when (monthlymaintenance > ${value}) 
        then 'expensive'
        else 'cheap' end 
        as cost FROM cd_facilities`)
        if(data.length > 0){
            res.status(200).json(data);
        } else {
            res.send('No se han encontrado resultados, ingrese otro parámetro')
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/exercise-nine/:value', async(req,res) => {
    const value = parseInt(req.params.value);
    try {
        let data = await db.any(`SELECT DISTINCT surname FROM cd_members ORDER BY surname FETCH FIRST ${value} ROWS ONLY`)
        if(data.length > 0){
            res.status(200).json(data);
        } else {
            res.send('No se han encontrado resultados, ingrese otro parámetro')
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/new-member', async(req, res) => {
    const {surname, firstname, address, telephone, joindate} = req.body;
    const zipcode = parseInt(req.body.zipcode);
    const recommendedby = parseInt(req.body.recommendedby);

    try {
        const result = await db.none(`INSERT INTO cd_members (surname, firstname,address,zipcode,telephone, recommendedby,joindate)
                                      VALUES ($1,$2,$3,$4,$5,$6,$7)`,[surname, firstname, address, zipcode, telephone, recommendedby, joindate]);
        return res.status(201).json({message:'Se agregó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.post('/new-facilities', async(req, res) => {
    const name = req.body.name;
    const {membercost, guestcost, initialoutlay, monthlymaintenance} = req.body;

    try {
        const result = await db.none(`INSERT INTO cd_facilities (name, membercost, guestcost, initialoutlay, monthlymaintenance)
                                      VALUES ($1,$2,$3,$4,$5)`,[name, membercost,  guestcost,  initialoutlay,  monthlymaintenance]);
        return res.status(201).json({message:'Se agregó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.post('/new-booking', async(req, res) => {
    const starttime = req.body.starttime;
    const {memid, facid, slots} = req.body;
    
    try {
        const result = await db.none(`INSERT INTO cd_bookings (memid, facid, starttime, slots)
                                      VALUES ($1,$2,$3,$4)`,[memid, facid, starttime, slots]);
        return res.status(201).json({message:'Se agregó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

module.exports = router;