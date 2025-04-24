const express = require('express');
const router = express.Router();
const adModel = require('../Model/AdModle')
const carController = require('../Controller/carController');
const adController = require('../Controller/AdController');

router.get('/Create/:id', (req,res)=>{
    const id = req.params.id
    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
      }

    res.render("AdvertisementForm",{ carId: id, userId : user.id})
});

router.get('/detail/:id',async (req, res)=>{
    const id = req.params.id
    const user = req.session.user;
    const ad = await adModel.findById(id); 

    if (!user) {
        return res.redirect('/login'); 
      }

    res.render('AdvertisementDetail', {
    advertisement: ad
    });
})

router.post('/update/:id', adController.checkAdOwnership, adController.updateAdById);
router.post('/delete/:id', adController.checkAdOwnership, adController.deleteAdById);


// Handle form submit
router.post('/:id', carController.checkCarOwnership, adController.createAdvertisement);
router.get('/:id', adController.getAdvertisementById);

module.exports = router;