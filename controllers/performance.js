//load in the dependency
const Outcome = require('../models/outcome');
//define the functions
const create = async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        if(!outcome) return res.status(404).send('Error finding outcome goal');
        outcome.performanceGoals.push({
            description:req.body.description,
            dateDue:req.body.dateDue,
            reward:req.body.reward,
            punishment:req.body.punishment,
            improveBy: {unit:req.body.improveBy.unit, number:req.body.improveBy.number},
            complete:req.body.complete,
            processGoals:req.body.processGoals
        });
        outcome.save();
        res.status(201).send(outcome);
    } catch(e) {
        console.error('ERROR in create function: ', e)
        res.status(500).send(e);
    }
};

const edit = (req,res) => {
    console.log('edit performance goal')
    res.send('edit performance goal')
};

const update = async (req, res) => {
    const updates = Object.keys(req.body);
    console.log(req.body, updates, "<_-- ")
    try {
        const object = await Outcome.findOne({"performanceGoals._id" : req.params.id});
        if (!object) return res.status(404).send('Error finding outcome goal');

        object.performanceGoals.forEach((goal) => {
            if(goal._id.toString() === req.params.id) {
                updates.forEach((update)=> goal[update] = req.body[update]);
            }
        });
        object.save();
        res.status(200).send(object);
    } catch (e) {
        console.error('ERROR in update function: ', e)
        res.status(500).send(e);
    }
};

const deletePerf = async (req, res) => {
    try {
        const outcome = await Outcome.findOne({"performanceGoals._id":req.params.id});
        console.log('outcome to delete: ', outcome)
        if(!outcome) return res.status(404).send('Error finding performance goal');
        const performanceGoal = await outcome.performanceGoals.find(performance => {
            return performance._id.toString() === req.params.id
        });
        const pg = await outcome.performanceGoals.indexOf(performanceGoal);
        outcome.performanceGoals.splice(pg,1);
        outcome.save();
        res.status(200).send(outcome);
    } catch (e) {
        console.error('ERROR in delete function: ', e)
        res.status(500).send(e);
    }
};
//export the functions
module.exports = {
    create,
    edit,
    update,
    delete: deletePerf
};