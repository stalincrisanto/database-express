const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

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

router.put('/update-booking/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    const starttime = req.body.starttime;
    const {memid, facid, slots} = req.body;

    try {
        const result = await db.none(`UPDATE cd_bookings SET memid=$1, facid=$2, starttime=$3, slots=$4 WHERE bookid = $5
                                      `,[memid, facid, starttime, slots, value]);
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

router.delete('/delete-booking/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        const result = await db.none(`DELETE FROM cd_bookings WHERE bookid = $1`,[value]);
        return res.status(201).json({message:'Se elimino correctamente la reserva con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})

module.exports = router;