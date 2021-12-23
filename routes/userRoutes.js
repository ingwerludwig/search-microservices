const express = require('express')
const router = express()
const userControl = require('../controllers/userController')

router.get('/', userControl.searchpage)
router.post('/', userControl.findImage)
router.get('/aboutus', userControl.aboutus)
router.get('/display', userControl.display)

module.exports = router