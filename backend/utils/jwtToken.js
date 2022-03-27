const sendToken = (user, statusCode, res)=>{
    const token = user.getJwtToken();

    // cookie options

    const options ={
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 *60 *1000
        ),
        httponly:true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success:true,
        token,
        user
    })
}

module.exports = sendToken