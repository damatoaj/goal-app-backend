const Outcome = require('../models/outcome');
const User = require('../models/user');

const index = async (req,res) => {
    console.log(req.query)
    try {
        const outcomes = await Outcome.find({userId:req.query.id});
        res.send(outcomes);
    } catch(e) {
        res.status(500).send();
    };
};

const show = async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) res.status(404).send();
        res.send(outcome);
    } catch(e) {
        res.status(500).send();
    };
};

const createOutcome = async (req, res) => {
    console.log(req.body)
    
    const outcome = new Outcome({
        description:req.body.description,
        dateDue:req.body.dateDue,
        complete:req.body.complete,
        reward:req.body.reward,
        punishment:req.body.punishment,
        userId:req.body.userId
    });
    try {
        const user = await User.findById(req.body.userId);
        console.log(user)
        await outcome.save()
        if(!user) return res.status(404).send();
        // await outcome.save();
        user.outcomeGoals.push(outcome)
        user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    };
};

const updateOutcome = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) return res.status(404).send();
        updates.forEach((update)=> outcome[update] = req.body[update]);
        await outcome.save();
        res.send(outcome);
    } catch (e) {
        res.status(500).send();
    }
};

const deleteOutcome = async (req, res) => {
    try {
        const outcome = await Outcome.findByIdAndDelete(req.params.id);
        if(!outcome) res.status(404).send();
        res.send(outcome);
    } catch (e) {
        res.status(500).send();
    };
};

module.exports = {
    index,
    show,
    create:createOutcome,
    update:updateOutcome,
    delete:deleteOutcome
}