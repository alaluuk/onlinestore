const express=require('express');
const router=express.Router();
const orders=require('../models/orders_model');

router.post('/cart',function(request,response){
    orders.accCart(request.user.username, request.body.payment_method, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.post('/orders',function(request,response){
    orders.addProducstToCart(request.body, function(err,result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/:id', function(request, response){
    orders.getOrderData(request.params.id, function(err,result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

module.exports=router;