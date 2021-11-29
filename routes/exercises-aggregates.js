const { raw } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/exercise-one', async (req, res) => {
    try {
        const result = await db('cd_facilities').count('*');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-two', async (req, res) => {
    try {
        const result = await db('cd_facilities').count('*').where('guestcost','>=',10);
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-three', async (req, res) => {
    try {
        const result = await db('cd_members').select('recommendedby').count('*').whereNotNull('recommendedby').groupBy('recommendedby').orderBy('recommendedby')
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-four', async (req, res) => {
    try {
        const result = await db('cd_bookings').select('facid').sum('slots as TotalSlots').groupBy('facid').orderBy('facid'); 
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-five', async (req, res) => {
    try {
        const result = await db('cd_bookings').select('facid').sum('slots as TotalSlots')
                            .whereBetween('starttime',['2012-07-01','2012-08-01'])
                            .groupBy('facid').orderBy('TotalSlots');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-six', async (req, res) => { //FALTA
    try {
        const result = await db('cd_bookings').select('facid',(db.raw(`EXTRACT(MONTH FROM ??)`,['starttime'])).as('month')).sum('slots as TotalSlots')
                        .where(db.raw('EXTRACT(YEAR FROM ??)',['starttime']),'=','2012')
                        .groupBy('facid','month')
                        .orderBy('facid','month');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-seven', async (req, res) => {
    try {
        const result = await db('cd_bookings').countDistinct('memid');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-eight', async (req, res) => { //Falta 
    try {
        const result = await db('cd_bookings').select('facid').sum('slots as TotalSlots')
                       .groupBy('facid')
                       .having(db.sum('slots*'), '>', 1000)
                       .orderBy('facid');

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-nine', async (req, res) => { //Falta
    try {
        const result = await db.select('facs.name').sum('slots*')
                            .raw('CASE WHEN memid = 0 THEN facts.guestcost ELSE facts.membercost')

        .select(
            "id",
            "units",
            db.raw("CASE WHEN units > 0 THEN cost ELSE '0' END AS cost")
          )

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-ten', async (req, res) => { //Falta
    try {
        const result = await 
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-eleven', async (req, res) => { 
    try {
        const result = await db('cd_bookings').select('facid').sum('slots as TotalSlots')
                            .groupBy('facid')
                            .orderBy('TotalSlots','desc')
                            .limit(1)

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-twelve', async (req, res) => { //Falta extract
    try {
        const result = await 

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-thirteen', async (req, res) => { //Falta
    try {
        const result = await db('cd_bookings').raw('sum(slots as TotalSlots)')

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-fourteen', async (req, res) => { 
    try {
        const result = await db('cd_bookings').select('cd_members.surname','cd_members.firstname','cd_members.memid')
                             .min('cd_bookings.starttime as starttime')
                             .innerJoin('cd_members', 'cd_members.memid', 'cd_bookings.memid')
                             .where('starttime','>=','2012-07-01')
                             .groupBy('cd_members.surname','cd_members.firstname','cd_members.memid')
                             .orderBy('cd_members.memid');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-fiveteen', async (req, res) => { 
    try {
        const result = await db('cd_members').select(db('cd_members').count('*').as('count'),'firstname','surname').orderBy('joindate');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-sixteen', async (req, res) => { 
    try {
        const result = await db('cd_members').select('firstname','surname').rowNumber(db.raw('order by ??'),['joindate']);
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-seventeen', async (req, res) => { //falta
    try {
        const result = await 
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

router.get('/exercise-eighteen', async (req, res) => { //falta
    try {
        const result = await 
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error al consultar los datos'})
    }
})

module.exports = router;