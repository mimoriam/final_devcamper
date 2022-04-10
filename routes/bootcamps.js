const express = require('express');
const router = express.Router();
const {
    getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    bootcampPhotoUpload,
} = require('../controllers/bootcamp_controller')

const courseRouter = require('./courses');

router.use('/:bootcampId/courses', courseRouter);

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getSingleBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

// For photo upload:
router.route('/:id/photo')
    .put(bootcampPhotoUpload)

module.exports = router;