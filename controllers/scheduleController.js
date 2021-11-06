const express = require('express');

var router = express.Router();
var baseResponse = require('../helper/responseHelpers');
const jwt = require('jsonwebtoken');
var workSche = require('../models/workschedule.model');
var applist = require('../models/app.model');




router.post('/addwork',(req,res)=>{
    /*  #swagger.auto = true
        #swagger.path= '/schedule/addwork'
        #swagger.method = 'post'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
       
        */
    
    var Name =req.body.Name;
    var day=req.body.day;
    var description=req.body.description;
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
    /*  #swagger.path= '/schedule/addApp'
        */
        
       var appName =req.body.appName;
       var block =req.body.block;
       var place =req.body.place;
       var packageName =req.body.packageName;
       var description =req.body.description;


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

                    
    var appId = req.body._id;
    var appName = req.body.appName;
    var block = req.body.block;
    var place = req.body.place;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;

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