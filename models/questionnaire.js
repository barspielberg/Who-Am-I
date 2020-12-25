const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionnaireSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      title: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          score: { type: Number, required: true },
        },
      ],
    },
  ],
  outcomes: [
    {
      imgUrl: { type: String },
      title: { type: String, required: true },
      description: { type: String },
      score: { type: Number, required: true },
    },
  ],
  userId:{type: mongoose.Types.ObjectId, require: true}
});

module.exports = mongoose.model("questionnaire", questionnaireSchema);
