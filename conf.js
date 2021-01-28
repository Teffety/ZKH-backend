module.exports = {
    jwtSecret:'i tut glava vsi rusi',
    jwt:{
        secret:'i tut glava vsi rusi',
        token:{
            access:{
                type:'access',
                expiresIn: '2h',
            },
            refresh:{
                type:'refresh',
                expiresIn: '80min',
            },
        }
    }
}