
const express = require('express');
const router = express.Router();

const home = require('../controllers/home');


//leerpersonas

router.get('/', home.read);
//crearpersona
 router.post('/crear', home.create);



//actualizarpersona
router.put('/:id', home.update);
//eliminarpersona

router.delete('/:id', home.delete);



module.exports = router;