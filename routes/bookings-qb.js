const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/get-bookings', async (req, res) => {
    try {
        const result = await db.select().table('cd_bookings');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.post('/new-booking', async(req, res) => {
    const starttime = req.body.starttime;
    const {memid, facid, slots} = req.body;
    
    try {
        await db('cd_bookings').insert({memid:memid, facid:facid,starttime:starttime,slots:slots})
        return res.status(201).json({message:'Se agregó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.put('/update-booking/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    const starttime = req.body.starttime;
    const {memid, facid, slots} = req.body;

    try {
        await db('cd_bookings')
              .where({bookid:value})
              .update({memid, facid, starttime, slots})
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

router.delete('/delete-booking/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        await db('cd_bookings').where('bookid', value).del();
        return res.status(201).json({message:'Se elimino correctamente la instalación con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})

module.exports = router;