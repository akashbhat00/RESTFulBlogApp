var express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/restful_blog_app');
app.use(bodyParser.urlencoded({extended: true}))
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);
app.set("view engine", 'ejs');
// Blog.create({
//     title: 'first blog',
//     image: 'poiuy',
//     body: 'this is my first blog'
// });
app.get('/', (req,res) => {
    res.redirect('/blogs');
});
app.get('/blogs', (req,res) => {
    Blog.find({},(err,blogs) => {
        console.log(blogs);
        if(err) {
            res.send('ERROR!!');
        }
       return res.render('index', {blogs: blogs});    
    });
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
})
