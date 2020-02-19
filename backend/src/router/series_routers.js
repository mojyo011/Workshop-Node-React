const router = require('express').Router();
const serieControl = require('../Controllers/series');

router.get('/', serieControl.listar);
router.post('/', serieControl.insere);
router.get('/:id', serieControl.buscaPorId);
router.put('/:id', serieControl.atualiza);
router.delete('/:id', serieControl.delete);

module.exports = router;