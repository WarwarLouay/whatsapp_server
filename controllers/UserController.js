const UserModel = require('../models/UserModel');

module.exports = {
    register: async function (req, res) {
        const data = req.body;
        const newData = new UserModel();

        newData.country = data.country;
        newData.phone = data.phone;

        let count = await UserModel.countDocuments({ phone: newData.phone }).exec();
        if(count > 0){
            return res.status(200).json({ message: 'Phone number already exist' });
        }

        await newData.save();
        return res.status(201).json(data);
    },

    login: async function (req, res) {
        const data = req.body;
        const newData = new UserModel();

        newData.phone = data.phone;

        let count = await UserModel.countDocuments({ phone: newData.phone }).exec();
        if(count > 0){
            return res.status(201).json(data);
        }

        return res.status(200).json({ message: 'Invalid phone number' });
    },

    getAllusers: async function (req, res) {
        try {
            const data = req.body;
            const newData = new UserModel();

            newData.phone = data.phone;

            let users = await UserModel.find().exec();
            return res.status(201).json({users: users});
        } catch (error) {
            console.log(error);
        }
    }
}