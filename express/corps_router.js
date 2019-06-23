module.exports = (Corps) => {
    let express = require('express');
    let router = express.Router();

    const jwt = require('jsonwebtoken');
    const checkJwt = require('express-jwt');
    const bcrypt = require('bcrypt');
    const jwtDecode = require('jwt-decode')

    //Endpoint for creating corporations. Only admin can create them
    router.post('/', (req, res) => {
        let { name, password, email, phone} = req.body;
        let decodedToken;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            decodedToken = jwtDecode(req.headers.authorization.split(' ')[1]);
        }
        if(!decodedToken.admin){
            res.status(401).json({msg:"Unauthorized. Not an admin account"})
            return;
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.log(err)
            }
            
            let newCorp = new Corps({name, hash, email, phone})
            
            newCorp.save();
            res.status(200).json({msg:'Corporation Created'})
        })
    });


    router.post('/authenticate', (req, res) => {
        const { name, password } = req.body
        if (!name || !password) {
            let msg = "Username or password missing!";
            res.status(401).json({msg: msg});
            return;
        }
        
        Corps.findOne({name:name}).then(corp => {
            if (corp) {
                bcrypt.compare(password, corp.hash, (err, result) => {
                    if(err) console.log(err)
                    if (result) {
                        
                        const token = jwt.sign({name, admin: name === 'admin' ? true : false}, process.env.JWT_SECRET, { expiresIn: '1h' });
                        
                        res.json({
                            msg: 'User authenticated successfully',
                            token: token
                        });
                    }
                    else res.status(401).json({msg: "Username or password mismatch!"})
                });
            } else res.status(401).json({msg: "Username or password mismatch!"})
        })
       
    });

    return router;
};