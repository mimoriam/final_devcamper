const express = require('express');
// This was done so the router available in bootcamps.js also work
const router = express.Router({ mergeParams: true });

const {
    getCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course_controller')

const Course = require('../models/CourseModel');
const advancedResults = require('../middleware_utils/advancedResult');
const { protect, authorize } = require('../middleware_utils/auth');

router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourses)
    .post(protect, authorize('publisher', 'admin'), createCourse)

router.route('/:id')
    .get(getSingleCourse)
    .put(protect, authorize('publisher', 'admin'), updateCourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router;