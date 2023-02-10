const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    
    shortId: {
        type: 'string',
        required: true,
        unique: true
    },
    redirectUrl: {
        type: 'string',
        required: true,
    },
    clicksHistory: [{ timestamp: { type: 'number' } }],
    clicksCount:{
        type: 'number'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }
});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;