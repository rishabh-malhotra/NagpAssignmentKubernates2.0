const { Router } = require('express')
const router = Router();
let ordersData=require('../data/orders.json')
const { initTracer } = require("../trace/tracing");
const serviceName="OrdersService"
const tracer = initTracer(serviceName);
const ordersinfo = "OrdersService Info"
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

router.get('/orders/:id', async (request, response) => {

    try 
    {
        let id = parseInt(request.params.id);
        const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, request.headers)
        const span = tracer.startSpan('http_GetOrdersByUserID', {
            childOf: parentSpanContext,
            tags: {
                [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
            }
        });

        
        span.setTag("TAG:", ordersinfo);
        const infoStr = `This is, ${ordersinfo}!`;
        span.log({
          event: "JSON-format",
          value: infoStr,
        });
        console.log(infoStr);
        span.log({ event: "This is orders info" });
        span.finish();

        console.log("orderId :"+id);
        response.status(200).send(ordersData);

    }

    catch (error) {
        console.log(error);
        response.status(500).send("Something went wrong!");
    }

});

module.exports = router;