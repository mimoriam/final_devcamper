const Course = require('../models/CourseModel');
const Bootcamp = require('../models/BootcampModel');
const asyncHandler = require("../middleware_utils/asyncHandler");
const ErrorResponse = require("../middleware_utils/errorResponse");

// @desc    GET all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {

    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});


// @desc    GET single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getSingleCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        data: course
    });
});


// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id of ${req.params.id}`), 404);
    }

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    });
});


// @desc    Update single course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`), 404);
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });
});


// @desc    Delete single course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`), 404);
    }

    await course.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});