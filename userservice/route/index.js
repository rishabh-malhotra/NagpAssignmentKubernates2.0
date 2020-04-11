const { Router } = require('express')
const router = Router();
const {User} = require('../db/dbindex')

router.get('/user/:id', async (request, response) => {

    try
    {
        let id = request.params.id;
        User.findByPk(id).then(function (user) {
            if (!user) {
                return response.sendStatus(404);
            }
            return response.status(200).send({
                name : user.name,
                age : user.age,
                email : user.email
            });
        });

    } 
    catch (error) 
    {
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;
