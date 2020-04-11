const { Router } = require('express')
const router = Router();

let userData={
    "name": "Rishabh",
    "age": "23",
    "email": "rishabh.malhotra@nagarro.com"  
  }

router.get('/user/:id', async (request, response) => {

    try
    {
        
        let id = request.params.id;
        console.log("userId :"+id);
        response.status(200).send(userData);

    } 
    catch (error) 
    {
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;
