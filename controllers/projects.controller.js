const Project = require('../models/project.model')
const Like = require('../models/like.model');

module.exports.list = (req, res, next) => {
  Project.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("user")
    .populate("comments")
    .populate("likes")
    .then((projects) => {
      res.render("projects/list", {
        projects,
        user: req.currentUser
      });
    })
    .catch(next);
}

module.exports.like = (req, res, next) => {
  const params = { project: req.params.id, user: req.currentUser._id };
  console.log(params);
  Like.findOne(params)
    .then(like => {
      if (like) {
        Like.findByIdAndRemove(like._id)
          .then(() => {
            res.json({ like: -1 });
          })
          .catch(next);
      } else {
        const newLike = new Like(params);
        newLike.save()
          .then(() => {
            res.json({ like: 1 });
          })
          .catch(next);
      }
    })
    .catch(next);
}

module.exports.detail = (req, res, next) => {
  const params = { project: req.params.id };
  console.log(params);
  Project.findOne(params)
    .then(project => {
      console.log("project: ")
      console.log(project)
      if (project) {
        res.render('projects/detail', { project })
          
      } else {
        res.render('notfound')
      }
    })
    .catch(next);
}