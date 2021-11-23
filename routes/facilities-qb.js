const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/get-facilities', async (req, res) => {
    try {
        const result = await db.select().table('cd_facilities');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.post('/new-facility', async(req, res) => {
    const name = req.body.name;
    const {membercost, guestcost, initialoutlay, monthlymaintenance} = req.body;

    try {
        await db('cd_facilities').insert({name:name,membercost:membercost,guestcost:guestcost,initialoutlay:initialoutlay,monthlymaintenance:monthlymaintenance})
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
        await db('cd_facilities')
              .where({facid:value})
              .update({name,membercost,guestcost,initialoutlay,monthlymaintenance})
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})

router.delete('/delete-facility/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        await db('cd_facilities').where('facid', value).del();
        return res.status(201).json({message:'Se elimino correctamente la instalación con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})

module.exports = router;