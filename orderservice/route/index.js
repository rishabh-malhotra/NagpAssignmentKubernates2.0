const { Router } = require('express')
const router = Router();


let ordersData={
        "orders": [
          {
            "orderId": 1,
            "orderAmount": 250,
            "orderDate": "14-Apr-2020"
          },
          {
            "orderId": 2,
            "orderAmount": 450,
            "orderDate": "15-Apr-2020"
          }
        ]      
    }

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