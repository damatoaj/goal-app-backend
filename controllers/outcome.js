const Outcome = require('../models/outcome');
const User = require('../models/user');

const index = async (req,res) => {
    try {
        const outcomes = await Outcome.find({userId:req.query.id});
        if(!outcomes) return res.status(404).send('Error finding outcome goals');

        res.status(200).send(outcomes);
    } catch(e) {
        res.status(500).send(e);
    };
};

const show = async (req, res) => {
    console.log('req', req.params)
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) return res.status(404).send('Error finding outcome goal');
        console.log(outcome,'<--- outcome')
        res.status(200).send(outcome);
    } catch(e) {
        res.status(500).send(e);
    };
};

const createOutcome = async (req, res) => {
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
        await outcome.save()
        if(!user) return res.status(404).send('Error finding user');
        user.outcomeGoals.push(outcome)
        user.save();
        res.status(201).send(outcome);
    } catch (e) {
        res.status(400).send(e);
    };
};

const updateOutcome = async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) return res.status(404).send('Error finding user');
        updates.forEach((update)=> outcome[update] = req.body[update]);
        await outcome.save();
        res.status(200).send(outcome);
    } catch (e) {
        res.status(500).send(e);
    }
};

const deleteOutcome = async (req, res) => {
    try {
        const outcome = await Outcome.findByIdAndDelete(req.params.id);
        
        if(!outcome) {
            return res.status(404).send();
        }
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    };
};

module.exports = {
    index,
    show,
    create:createOutcome,
    update:updateOutcome,
    delete:deleteOutcome
}