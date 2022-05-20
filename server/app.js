var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Récupération DB
var dbConnection = require('./data/dbConnection')
//Initialisation connection
dbConnection.initialize();

// CORS
var cors = require('cors');
app.use(cors());
// passport
const passport = require('passport');
require('./auth/config');
app.use(passport.initialize());
//index
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// User jamais appeler à vérifier mais peut être bien de différencier auth et getUser??? 
var usersRouter = require('./routes/users');
app.use('/users', usersRouter); 
// Authentification
var authRouter = require('./routes/auth');
app.use('/auth', authRouter);
//Project
var projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);
//Team
var teamsRouter = require('./routes/teams');
app.use('/teams', teamsRouter);
//Meeting
var meetingsRouter = require('./routes/meetings')
app.use('/meetings', meetingsRouter);

/* Multer https://www.sitepoint.com/mediastream-api-record-audio/*/
//app.use(express.static('uploads')); 
var uploads = require('./routes/multer');
app.use('/upload', uploads);

var membersRouter = require('./routes/members');
app.use('/members', membersRouter);

//Note
var noteRouter = require('./routes/note');
app.use('/note', noteRouter);





module.exports = app;
