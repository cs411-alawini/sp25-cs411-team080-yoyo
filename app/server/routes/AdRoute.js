const express = require('express');
const router = express.Router();
const adController = require('../Controller/AdController');

router.get('/:id', (req,res)=>{
    const id = req.params.id
    const user = req.session.user;

    res.render("AdvertisementForm",{ carId: id, userId : user.id})
});

// Handle form submit
router.post('/:id', adController.createAdvertisement);

module.exports = router;