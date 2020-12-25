const Questionnaire = require("../models/questionnaire");

exports.getQuestionnaire = (req, res, next) => {
  const id = req.params.quesId;
  Questionnaire.findById(id)
    .then((ques) => {
      ques.questions.forEach((question) => {
        question.options.sort((a, b) => 0.5 - Math.random());
      });

      res.render("questionnaire", {
        title: ques.title,
        questionnaire: ques,
        user: req.user,
      });
    })
    .catch((err) => {
     next(err);
    });
};

exports.postQuestionnaire = (req, res, next) => {
  const id = req.params.quesId;
  const answers = Object.values(req.body);
  Questionnaire.findById(id)
    .then((ques) => {
      const outcomes = ques.outcomes.map((o) => ({
        imgUrl: o.imgUrl,
        title: o.title,
        description: o.description,
        score: o.score,
        percentage: Math.floor(
          (answers.filter((a) => a == o.score).length * 100) / answers.length
        ),
      }));

      outcomes.sort((a, b) => b.percentage - a.percentage);

      res.render("answers", {
        title: ques.title,
        outcomes: outcomes,
        user: req.user,
      });
    })
    .catch((err) => {
      next(err);
    });
};
