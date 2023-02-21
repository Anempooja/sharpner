const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

 const User = require('./models/user');

// const mongoconnect=require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63f4bb5ff352af5d662851f2")
    .then(user => {
      req.user=user
      
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//app.use(errorController.get404);




mongoose.connect('mongodb+srv://anempooja:anem123@cluster1.98k8f48.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User(
        {
          name:'pooja',
          email:'pooja@gmail.com',
          cart:{
            items:[]
          }
        })
        user.save()
    }
  })
  
  app.listen(3000)
})
.catch(err=>{
  console.log(err)
})