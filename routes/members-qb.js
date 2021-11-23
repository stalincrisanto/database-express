const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/get-members', async (req, res) => {
    try {
        const result = await db.select().table('cd_members');
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error'})
    }
})

router.post('/new-member', async(req, res) => {
    const {surname, firstname, address, telephone, joindate} = req.body;
    const zipcode = parseInt(req.body.zipcode);
    const recommendedby = parseInt(req.body.recommendedby);

    try {
        const result = await db('cd_members').insert({surname: surname, firstname: firstname, address:address, zipcode:zipcode,
                                                      telephone:telephone, recommendedby: recommendedby, joindate:joindate
                                                      })
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
        await db('cd_members').where({memid:value})
                              .update({
                                surname,
                                firstname,
                                address,
                                zipcode,
                                telephone,
                                recommendedby,
                                joindate
                               })
        return res.status(201).json({message:'Se modificó correctamente'})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la modificación'})
    }
})

router.delete('/delete-member/:value', async (req, res) => {
    const value = parseInt(req.params.value);
    try {
        await db('cd_members').where('memid', value).del();
        return res.status(201).json({message:'Se elimino correctamente el usuario con id: '+value})
    } catch (err) {
        return res.status(500).json({message:'Se produjo un error en la eliminación'})
    }
})


module.exports = router;