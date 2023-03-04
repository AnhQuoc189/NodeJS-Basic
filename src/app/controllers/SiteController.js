const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    async index(req, res, next) {
        // const courses = await Course.find({}).lean();
        // if (courses) {
        //     res.json(courses);
        // } else {
        //     res.status(400).json({ error: 'ERROR!!!  ' });
        // }
        // courses.map((course) => {
        //     console.log(course.name);
        // });

        Course.find({})
            .then((courses) => {
                res.render('home', { courses: mutipleMongooseToObject(courses) });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
