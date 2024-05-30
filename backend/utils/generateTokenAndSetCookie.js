import jwt from 'jsonwebtoken'; 


const generateTokenAndSetCookie = (payload, res) => {
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn : '15d'
        }); 

        const cookieOptions =  {
            maxAge : 15 * 24 * 60 * 60 * 1000,      // Cookie Expiry time in Milliseconds 
            httpOnly : true,                        // Prevents XSS attacks, aka cross-site scripting attacks 
            sameSite : "strict",                    // CSRF attacks, aka cross-site request forgery attacks 
            secure : true
        };

        res.cookie('jwt', token, cookieOptions);

        return token; 
    }
    catch(err){
        console.log(`Error occured while generating token and setting cookie: ${err.message}`); 
        res.status(500).json({
            message : 'Internal server error',
            error : true 
        })
    }
}

export default generateTokenAndSetCookie; 