const express=require('express');
const router=express.Router();
const customers=require('../models/customers_model');

router.get('/',function(request, response){
    if(request.user.role != 'admin'){
         return response.status(403).json("Sinulla ei ole oikeutta tähän resurssiin");
    }
    customers.getAllCustomers(function(err,result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/:u',function(request, response){
    console.log(request.user);
    if(request.user.username != request.params.u){
        return response.status(403).json("Sinulla ei ole oikeutta tähän resurssiin");
    }
    customers.getOneCustomer(request.params.u,function(err,result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result[0]);
        }
    });
});

router.post('/', function(request, response){
    customers.add(request.body, function(err,result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result);
        }
    });
});

router.put('/:u', function(request, response){
    customers.update(request.params.u, request.body, function(err,result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result);
        }
    });
});

router.patch('/:u', function(request, response){
    customers.updatePassword(request.params.u, request.body, function(err,result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result);
        }
    });
});

router.delete('/:u', function(request, response){
    customers.delete(request.params.u, function(err, result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result);
        }
    });
});

module.exports=router;