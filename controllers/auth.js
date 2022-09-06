const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

const signup = async (req, res) => {
    try{
        console.log(req.body, "<---- the bod")
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });

        if (!user) return res.status(409).send('User exists already')
        const token = await createUserToken(req, user);
        user.save();
        res.status(201).send({token, user});
    } catch(e) {
        res.status(e.statusCode).send('Signup Unsuccessful');
    }
};

const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(404).send("Try another email");
        }
        const token = await createUserToken(req, user);
        res.status(201).send({token, user});
    } catch(e) {
        console.error(e, "<<< e")
        res.status(e.statusCode).send('Invalid Credentials');
    }
};

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const user = await User.findById(req.user._id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.status(201).send(user);
    } catch(e) {
        res.status(500).send(e);
    }
};

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id);

        res.status(200).send(user);
    }catch (e) {
        res.status(500).send(e)
    }
};

module.exports = {
    signup,
    login,
    update,
    delete: deleteUser
};