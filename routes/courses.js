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


router.route('/')
    .get(getCourses)
    .post(createCourse)

router.route('/:id')
    .get(getSingleCourse)
    .put(updateCourse)
    .delete(deleteCourse)

module.exports = router;