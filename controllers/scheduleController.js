const express = require('express');

var router = express.Router();
var baseResponse = require('../helper/responseHelpers');
const jwt = require('jsonwebtoken');
var workSche = require('../models/workschedule.model');
var applist = require('../models/app.model');




router.post('/addwork',(req,res)=>{
    /*  #swagger.auto = true
        #swagger.path= '/schedule/addwork'
        #swagger.method = 'get'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
       
        */
    // let task = {
    //           "Name":req.body.Name,
    //           "day":req.body.day,
    //           "description":req.body.description ,
    //           "startTime":req.body.startTime,
    //           "endTime":req.body.endTime,}

var work = new workSche(req.body)
work.save((err, doc) => {
        if (!err)
          res.json({
            "status":200,
            "meesage":"sucessfully saved",
            "data":doc
            });
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                // baseResponse.errorResponse(res,err,404,"Not found")
            }
            else
                console.log('Error during record insertion : ' + err);
                // baseResponse.errorResponse(res,err,404,"Not found")      
        }
    });

});


router.get('/allwork',(req,res)=>{
                
        /*  #swagger.auto = false
            #swagger.path= '/schedule/allwork'
            #swagger.method = 'get'
            #swagger.produces = ['application/json']
            #swagger.consumes = ['application/json']
             #swagger.parameters['id'] = {
            in: 'path',
            type: 'integer',
            description: 'User ID.' } 
        */
  console.log("swagger working");
    workSche.find(function (err, docs) {
    if (!err)

          baseResponse.successGetResponse(res,docs,"success");// #swagger.responses[200]
    
    else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              baseResponse.errorResponse(res,err,404,"Not found");// #swagger.responses[404]
            
          }
          else
              console.log('Error during record insertion : ' + err);// #swagger.responses[400]
              baseResponse.errorResponse(res,err,404,"Not found")      
      }
  });

});


router.post('/addApp',(req,res)=>{
    // #swagger.path= '/schedule/addwork'
    // res.json({
    //     "status":200,
    //     "meesage":"sucessfully saved",
    // });

var pro = new applist(req.body)
pro.save((err, doc) => {
if (!err)
   baseResponse.successGetResponse(res,doc,"success");

else {
    if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        // baseResponse.errorResponse(res,err,404,"Not found")
      
    }
    else
        console.log('Error during record insertion : ' + err);

        // baseResponse.errorResponse(res,err,404,"Not found")      
}
});

});


router.get('/allApp',(req,res)=>{
                // #swagger.path= '/schedule/allApp'
    applist.find(function (err, docs) {
    if (!err)
          baseResponse.successGetResponse(res,docs,"success");
    
    else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              baseResponse.errorResponse(res,err,404,"Not found")
            
          }
          else
              console.log('Error during record insertion : ' + err);
              baseResponse.errorResponse(res,err,404,"Not found")      
      }
  });

});

router.get('/blockedApps',(req,res)=>{
                // #swagger.path= '/schedule/blockedApps'
    applist.find({"block":true},{"block":true,"appName":true},function (err, docs) {
    if (!err)
          baseResponse.successGetResponse(res,docs,"success");
    
    else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              baseResponse.errorResponse(res,err,404,"Not found")
            
          }
          else
              console.log('Error during record insertion : ' + err);
              baseResponse.errorResponse(res,err,404,"Not found")      
      }
  });

});

router.get('/limitedApps',(req,res)=>{
                // #swagger.path= '/schedule/limitedApps'
    applist.find(function (err, docs) {
    if (!err)
          baseResponse.successGetResponse(res,docs,"success");
    else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              // baseResponse.errorResponse(res,err,404,"Not found")
          }
          else
              console.log('Error during record insertion : ' + err);
              // baseResponse.errorResponse(res,err,404,"Not found")      
      }
  });

});

router.post('/editApp/',(req,res)=>{
                    // #swagger.path= '/schedule/editApps'

                    req.au
    var appId = req.body._id;

    var pro = new applist(req.body);
    applist.findByIdAndUpdate(appId,pro,function (err, doc) {
    if (!err)
          baseResponse.successGetResponse(res,doc,"added successfullly");
    
    else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              // baseResponse.errorResponse(res,err,404,"Not found")
            
          }
          else
              console.log('Error during record insertion : ' + err);
      
              // baseResponse.errorResponse(res,err,404,"Not found")      
      }
  });

});


module.exports = router;