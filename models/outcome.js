const mongoose = require('mongoose');

const options = {
    timestamps: true
}

//create outcome between performance and process
const processSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    duration: {
        number: {
            type: Number,
        },
        time: {
            type:String,
            enum: ['MIN', 'HRS']
        }
    },
    frequency: {
        number: {
            type: String
        },
        type: {
            type:String,
            enum:["DAILY, WEEKLY, MONTHLY, YEARLY"]
        }
    },
    repeats: {
        type: Boolean
    }
})
//create relation between outcome and performance
const performanceSchema = new mongoose.Schema({
    dateDue: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    improveBy: {
        unit: {
        type:String,
    }, 
        number: {
        type: Number
    },
    },
    reward: {
        type: String
    },
    punishment: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    processGoals: [processSchema]
})
//outcome Schema
const outcomeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    dateDue: {
        type: Date,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    reward: {
        type: String
    },
    punishment: {
        type: String
    },
    performanceGoals: {
        type: [performanceSchema]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports=mongoose.model('Outcome', outcomeSchema);