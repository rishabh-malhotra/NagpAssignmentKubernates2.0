const { Router } = require('express')
const router = Router();
let ordersData=require('../data/orders.json')

router.get('/orders/:id', async (request, response) => {

    try 
    {
        let id = request.params.id;
        console.log("orderId :"+id);
        response.status(200).send(ordersData);

    }

    catch (error) {
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;