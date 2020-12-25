const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const Questionnaire = require("../models/questionnaire");

exports.getCreatorPage = (req, res, next) => {
  Questionnaire.find({ userId: req.user.id })
    .then((result) => {
      res.render("creator-page", {
        title: "השאלונים שלי",
        questionnaires: result,
        user: req.user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCreateNew = (req, res) => {
  res.render("create-new", { title: "שאלון חדש", user: req.user });
};

exports.postCreateNew = (req, res, next) => {
  const { op1img, op2img, op3img, op4img } = req.files;
  const imgs = [op1img, op2img, op3img, op4img];

  const title = req.body.title;
  const des = req.body.des;
  const outcomes = [
    {
      title: req.body["op-1"],
      description: req.body["op-1-des"],
      score: 1,
      imgUrl: op1img ? op1img[0].path : null,
    },
    {
      title: req.body["op-2"],
      description: req.body["op-2-des"],
      score: 2,
      imgUrl: op2img ? op2img[0].path : null,
    },
    {
      title: req.body["op-3"],
      description: req.body["op-3-des"],
      score: 3,
      imgUrl: op3img ? op3img[0].path : null,
    },
    {
      title: req.body["op-4"],
      description: req.body["op-4-des"],
      score: 4,
      imgUrl: op4img ? op4img[0].path : null,
    },
  ];

  const questions = [];

  for (let i = 1; req.body[`qu-${i}`]; i++) {
    questions.push({
      title: req.body[`qu-${i}`],
      options: [
        { text: req.body[`qu-${i}-op-1`], score: 1 },
        { text: req.body[`qu-${i}-op-2`], score: 2 },
        { text: req.body[`qu-${i}-op-3`], score: 3 },
        { text: req.body[`qu-${i}-op-4`], score: 4 },
      ],
    });
  }

  const questionnaire = new Questionnaire({
    title: title,
    description: des,
    outcomes: outcomes,
    questions: questions,
    userId: req.user.id,
  });

  questionnaire
    .save()
    .then(() => {
      res.redirect("/creator");
    })
    .catch((err) => {
      next(err);
    });


    imgs.forEach((img) => {
      if (img) {
        sharp(img[0].path)
          .resize(400)
          .toFile(img[0].filename)
          .then((data) => {
            fs.rename(img[0].filename, img[0].path, (err) => {
              if (err && fs.existsSync(img[0].filename)) {
                fs.unlink(img[0].filename);
              }
            });
          })
          .catch((err) => {
            if (fs.existsSync(img[0].filename)) fs.unlink(img[0].filename);
          });
      }
    });



};

exports.postDelete = async (req, res, next) => {
  const { quizid } = req.body;
  try {
    const quiz = await Questionnaire.findById(quizid);
    if (quiz) {
      quiz.outcomes.forEach((outcome) => {
        if (outcome.imgUrl && fs.existsSync(outcome.imgUrl)) {
          fs.unlink(outcome.imgUrl, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });

      await quiz.deleteOne();
    } else throw new Error();
  } catch (error) {
    throw error;
  }
  res.redirect("/creator");
};
