const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController')
const questionController = require('../controllers/QuestionController')
const userController = require('../controllers/UserController')
const quizController = require('../controllers/QuizControler')
const validators = require('../helpers/validators')


//Event related
router.post('/events', validators.validateAdmin, eventController.create);
router.get('/events', eventController.getAll);
router.get('/event/:id', eventController.getEvent);
router.put('/event/:id', validators.validateAdmin, eventController.updateEvent);
router.delete('/event/:id', validators.validateAdmin, eventController.deleteEvent);


//Quiz related
router.post('/quizzes', validators.validateAdmin, quizController.create);
router.get('/quizzes', validators.validateUser, quizController.getAll);
router.get('/quiz/:id', validators.validateUser, quizController.getOne);
router.delete('/quiz/:id', validators.validateAdmin, quizController.deleteRules);
router.put('/quiz/:id', validators.validateAdmin, quizController.updateRules);
router.post('/validatequiz', validators.validateUser, quizController.validateQuiz);
//get burned qr codes in frontend, call get quiz, see array there
router.post('/generateQR', quizController.generateQR);
router.put('/useQR', quizController.useQR)

//Questions related
router.post('/questions', validators.validateAdmin, questionController.create);
router.get('/questions', validators.validateAdmin, questionController.getAllQuestions);
router.get('/questions/:resource', validators.validateAdmin, questionController.getResource);
router.get('/question/:id', validators.validateAdmin, questionController.getQuestion);
router.put('/question/:id', validators.validateAdmin, questionController.updateQuestion);
router.delete('/question/:id', validators.validateAdmin, questionController.deleteQuestion);


//User related
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/confirm/:token', userController.confirm)


router.post('/test', (req, res)=>{
    res.send(req.body)
})
module.exports = router;