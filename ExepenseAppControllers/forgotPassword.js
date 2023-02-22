const uuid=require('uuid')
const bcrypt=require('bcrypt')
const forgotPasswordRequests=require('../ExpenseAppModels/forgotPasswordRequests')
const User=require('../ExpenseAppModels/user')
exports.forgotPassword = async (req, res) => {
    try {
      const email = req.params.emailId
      const user = await User.find({ email:  email  });
      if(user){
        
        const id = uuid.v4();
        const forgotPasswordRequest=new forgotPasswordRequests({
          isActive: true,
          userId: user[0].id
        })
        forgotPasswordRequest.save()
        .then((result)=>{
          console.log(result)
        }).catch((err) => {
          console.log(err)
          throw new Error(err);
        });      
        return res.json({resetlink:`<a href="http://localhost:3000/forgotPassword/resetPassword/${id}">Reset password</a>`,user:user});
      } else {
        throw new Error("User doesnt exist");
      }
    } catch (err) {
      console.log(err)
      return res.json({ message: err,sucess: false });
    }
  };
  exports.resetPassword = (req, res) => {
    const id = req.params.uuid;
    forgotPasswordRequests.findOne({ id: id  }).then((forgotpassword) => {
      if (forgotpassword) {
        forgotpassword.updateOne({ isActive: false });
        res.status(200).send(`<html>
                                  
                                      <script>
                                          function formsubmitted(e){
                                              e.preventDefault();
                                              window.location.href= "C:\Users\HP 3500TX\Desktop\firstgit\expense login.html";
                                              console.log('called')
                                          }
                                      </script>
                                      <form action="/forgotPassword/updatepassword/${id}" method="get">
                                          <label for="newpassword">Enter New password</label>
                                          <input name="newpassword" type="password" required></input>
                                          <button>reset password</button>
                                      </form>
                                  </html>`);
        res.end();
      }
    });
  };
  exports.updatepassword = (req, res) => {
    try {
      const { newpassword } = req.query;
      const resetpasswordid = req.params.id;
      //console.log(resetpasswordid)
      forgotPasswordRequests.find({ id: resetpasswordid })
      .then((resetpasswordrequest) => {
          console.log(resetpasswordrequest)
          User.find({ id: resetpasswordrequest[0].userId } )
          .then((user) => {
              console.log(user)
              if (user) {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function (err, salt) {
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  bcrypt.hash(newpassword, salt, function (err, hash) {
                    if (err) {
                      console.log(err);
                      throw new Error(err);
                    }
                    user[0].updateOne({ password: hash }).then(() => {
                      res.status(201).json({ message: "Successfuly update the new password" });
                    });
                  });
                });
              } else {
                return res
                  .status(404)
                  .json({ error: "No user Exists", success: false });
              }
            }
          );
        }
      );
    } catch (error) {
      console.log(error)
      return res.status(403).json({ error, success: false });
    }
  };