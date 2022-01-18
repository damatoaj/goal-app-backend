const Outcome = require('../models/outcome');

const index = async (req,res) => {
    try {
        const outcomes = await Outcome.find({});
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
    const outcome = new Outcome(req.body);
    try {
        await outcome.save();
        res.status(201).send(outcome);
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