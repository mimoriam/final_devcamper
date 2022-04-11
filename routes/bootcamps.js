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

const Bootcamp = require('../models/BootcampModel');
const advancedResults = require('../middleware_utils/advancedResult');
const { protect, authorize } = require('../middleware_utils/auth');

const courseRouter = require('./courses');

router.use('/:bootcampId/courses', courseRouter);

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp)

router.route('/:id')
    .get(getSingleBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

// For photo upload:
router.route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

module.exports = router;