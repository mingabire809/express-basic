const express = require('express')
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const members = require('./Members')


const logger = require('./middleware/logger')

//Init middleware
//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members: members
}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));



//Members Api routes
app.use('/api/members', require('./routes/api/members'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));