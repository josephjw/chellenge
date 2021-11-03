'use strict';
const mongoose = require('mongoose');

var appsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    appName: {
        type: String,
        required: 'This field is required.'
    },
    block: {
        type: Boolean,
        default:false
    },
    packageName:{type: String,default:'com.play.console'},
    weekday_hours:{type: String,default:'0:00'},
    weekend_hours:{type: String,default:'0:00'},
    created_at:{ type: Date },
    updated_at:{ type: Date, default: Date.now },
    updated:{type: Date, default: Date.now}
},);

module.exports =mongoose.model('applist', appsSchema);