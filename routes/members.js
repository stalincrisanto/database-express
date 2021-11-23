const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

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

router.put('/update-member/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    const {surname, firstname, address, telephone, joindate} = req.body;
    const zipcode = parseInt(req.body.zipcode);
    const recommendedby = parseInt(req.body.recommendedby);

    try {
        const result = await db.none(`UPDATE cd_members SET surname=$1, firstname=$2,address=$3,
                                      zipcode=$4,telephone=$5, recommendedby=$6, joindate=$7 WHERE memid = $8
                                      `,[surname, firstname, address, zipcode, telephone, recommendedby, joindate, value]);
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

router.delete('/delete-member/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        const result = await db.none(`DELETE FROM cd_members WHERE memid = $1`,[value]);
        return res.status(201).json({message:'Se elimino correctamente el usuario con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

module.exports = router;