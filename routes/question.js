const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const func = require('./../scripts/script');
const json = func.getJson();
const test = require('./../public/js/js.js');
const cookieParser = require('cookie-parser');
const fs = require('fs');
let questions = JSON.parse(fs.readFileSync('./questions.json'));
let classes = JSON.parse(fs.readFileSync('./classes.json'));
router.use(cookieParser());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const questionController = require('./../controllers/questionController');

router.get('/', questionController.index);

function getQuestionByquestionNumber(questionNumber){
  for(let i = 0; i < questions.length; i++){
    if(questions[i].questionNumber == questionNumber){
      return questions[i];
    }
  }
  return null;
}

function checkIfCategoryIsInClass(category, classname){
  for(let i = 0; i < classes.length; i++){
    if(classes[i].name == classname){
      for(let j = 0; j < classes[i].cathegories.length;j++){
        if(classes[i].cathegories[j]==category){
          return true;
        }
      }
    }
  }
  return false;
}

router.post(
  '/answers',
  function (req, res) {
    let scorePerClass = [];
    for(let i = 0; i < classes.length; i++) {
      scorePerClass.push({"name":classes[i].name,"score":0});
    }
    let answers = req.body;
    let questionKeys = Object.keys(answers);//make response iterable
    let answerValues = Object.values(answers);//make response iterable

    for(let j = 0; j < questionKeys.length; j++) {
      let question = getQuestionByquestionNumber(questionKeys[j]);
      for(let k = 0; k<question.positiveRealation.length;k++){
        for(let i = 0; i < scorePerClass.length; i++){
          if(checkIfCategoryIsInClass(question.positiveRealation[k],scorePerClass[i].name)){
            if(answerValues[j]=="yes"){
              scorePerClass[i].score++;
            }else if(answerValues[j]=="no"){
              scorePerClass[i].score--;
            }
          }
        }
      }
      for(let k = 0; k < question.negativeRelation.length; k++){
        for(let i = 0; i < scorePerClass.length; i++){
          if(checkIfCategoryIsInClass(question.negativeRelation[k],scorePerClass[i].name)){
            if(answerValues[j]=="no"){
              scorePerClass[i].score++;
            }else if(answerValues[j]=="yes"){
              scorePerClass[i].score--;
            } 
          }
        }
      }
    }
    scorePerClass = scorePerClass.sort((a,b) => b.score - a.score);
    res.cookie('language', 'nl');

    res.render('answer', {
      post: scorePerClass,
    });
  }
);

module.exports = router;
