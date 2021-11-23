const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

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

router.put('/update-facility/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    const name = req.body.name;
    const {membercost, guestcost, initialoutlay, monthlymaintenance} = req.body;

    try {
        const result = await db.none(`UPDATE cd_facilities SET name=$1, membercost=$2,guestcost=$3,
                                      initialoutlay=$4,monthlymaintenance=$5 WHERE facid = $6
                                      `,[name, membercost,  guestcost,  initialoutlay,  monthlymaintenance, value]);
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

router.delete('/delete-facility/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        const result = await db.none(`DELETE FROM cd_facilities WHERE facid = $1`,[value]);
        return res.status(201).json({message:'Se elimino correctamente la instalación con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})

module.exports = router;