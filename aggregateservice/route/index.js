const { Router } = require('express');
const router = Router();
const request = require('request');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
var headers = {};
const { initTracer } = require("../trace/tracing");
const serviceName="AggregateService"
const tracer = initTracer(serviceName);
const aggregateInfo = "Aggregate Info"


const USER_SERVICE_URL =process.env.USERSERVICEURL||'localhost:61550';
const ORDER_SERVICE_URL=process.env.ORDERSERVICEURL||'localhost:61551';

router.get('/orderdetails/:id', async (request, response) => {

    try 
    {
        let id = request.params.id;
        console.log("Id for which data is requested in aggrgate service:"+id)

        const span = tracer.startSpan("AggregateUserOrdersByUserID");
         span.setTag("TAG", aggregateInfo);
         span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);
         const infoStr = `This is, ${aggregateInfo}!`;
         span.log({
           event: "JSON-format",
           value: infoStr,
         });
         console.log(infoStr);
         span.log({ event: "This is aggregate info" });
         tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
        
        
        let userData = await getUserData(id);
        let orderData = await getOrdersData(id);
        
        span.finish();

        let aggregateData={
            "userDetails": JSON.parse(userData),
            "orders": JSON.parse(orderData).orders
        };            
        response.status(200).send(aggregateData);
    }
    catch (error) 
    {
        console.log(error)
        response.status(500).send("Something went wrong!");
    }

});

const getUserData = (id) => {
 return new Promise(function(resolve, reject) {
  const options = {
    url: `http://${USER_SERVICE_URL}/user/${id}`,
    method: 'GET',
    headers: headers };
    console.log(headers);
   
    request(options, function(error, response, body) {
     if (error) {
       reject(error);
       console.log(error)
     } else {
       resolve(body);
     }
   })
 })
}

const getOrdersData = (id) => {
return new Promise(function(resolve, reject) {
  const options = {
    url: `http://${ORDER_SERVICE_URL}/orders/${id}`,
    method: 'GET',
    headers: headers 
  };
  console.log(headers);

  request(options, function(error, response, body) {
    if (error) {
      reject(error);
      console.log(error)
    } else {
      resolve(body);
    }
  })
})
}
module.exports = router;