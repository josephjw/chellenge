const mongoose = require('mongoose');

var appsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    Name: {
        type: String,
        required: 'This field is required.'
    },
    day:[{
        type: String,
        enum : ['SUN','MON','TUE','WED','THU','FRI','SAT'],

    }],
    description:{
        type: String,
        default:"Not given"
    },
    startTime:{ type: Date,default: "" },
    updated_at:{ type: Date, default: Date.now },
    endTime:{type: Date, default: ""}
},);

// Custom validation for email
// appsSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
module.exports =mongoose.model('WorkSchedule', appsSchema);

// mongoose.model={
//     PrductModel: productSchema,
// ProductSchema:appsSchema
// };