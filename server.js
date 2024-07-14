const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const {readFile} = require("fs");
const {checkForDuplication, processData} = require("./utils/graphFunctionsUtilities");
const cors = require("cors");
const server = express();
// const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const graphRoutes = require('./routes/graphRoute')


// view engine setup
// server.set('views', path.join(__dirname, 'views'))
// server.set('view engine', 'pug')

// server.use(logger('dev'))
server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(cookieParser())
server.use(cors()); // Add this line
// server.use(express.static(path.join(__dirname, 'public')))

// ------------------- Routers
// server.use('/', indexRouter)
// server.use('/users', usersRouter)
// server.use("/api/v1/graph", graphRoutes)

// catch 404 and forward to error handler
// server.use(function (req, res, next) {
//     next(createError(404))
// })

// error handler
// server.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//     // render the error page
//     res.status(err.status || 500)
//     res.render('error')
// })

server.get('/', (req, res) => {
    res.send('Welcome to Home page for sending graph API')
    // res.write('hello') ---> shows error that node crashes
});

server.get('/cluster/:clusterNumber', (req, res) => {
    const {clusterNumber} = req.params

    readFile('./HadithGraphRawData.txt', 'utf8', (err, rawData) => {
        if (err) {
            console.error('Error reading the file', err);
            res.status(500).send('Error reading the file');
            return;
        }

        const resultArray = processData(rawData);
        const result = checkForDuplication(resultArray, clusterNumber);

        if (!result) {
            res.status(404).send('Cluster not found');
            return;
        }

        // console.log(JSON.stringify(result))
        res.status(200).json(result)
        // res.json({status: 200, message: "successful", result: result});
    });
});

const start = async () => {
    try {
        console.log('Database Connected Successfully.');
        server.listen(5000, () => console.log('Server is listening on port 5000....'));
    } catch (error) {
        console.log(error.message);
    }
};

start().then(() => console.log("Done."));

// module.exports = server
