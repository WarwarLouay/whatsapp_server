const MessageModel = require('../models/MessageModel');

module.exports = {
    sendMessage: async function (req, res) {
        const data = req.body;
        const newData = new MessageModel();

        newData.sourceId = data.sourceId;
        newData.targetId = data.targetId;
        newData.message = data.message;
        newData.time = data.time;

        await newData.save();
        return res.status(201).json(data);
    },

    getMessages: async function (req, res) {
        try {
            let messages = await MessageModel.find({sourceId: req.body.sourceId, targetId: req.body.targetId}).exec();
            if(messages.length <= 0) {
                messages = await MessageModel.find({sourceId: req.body.targetId, targetId: req.body.sourceId}).exec();
            }
            return res.status(201).json(messages);
        } catch (error) {
            console.log(error);
        }
    }
}