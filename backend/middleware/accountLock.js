import User from "../models/user.model";

export const accountLock = async(req, res, next) => {
  try {
    const {username} = req.body;

    if(username){
      return next;
    }

    const user = await User.findOne({username: username.toLowerCase()});

    if(user && user.lockUntil && user.lockUntil > Data.now()){
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(423).json({
        error: `Account temporarily locked. Try Again in ${remainingTime} minutes`
      })
    }

    next();
  } catch (error) {
    next();
  }
}