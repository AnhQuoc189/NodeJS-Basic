const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("courses/show", { course: MongooseToObject(course) })
      )
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /courses/store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", { course: MongooseToObject(course) })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[DELETE] /courses/:force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next){
    Course.restore({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormAction(req, res, next){
    switch(req.body.acion){
      case 'delete':
        Course.delete({ _id: {$in:req.body.courseIds} })
        .then(() => res.redirect("back"))
        .catch(next); 
        break;
      default:
        res.json({error:'Action is invalid'})
    }
    // console.log(req.body);
  }
}

module.exports = new CourseController();
