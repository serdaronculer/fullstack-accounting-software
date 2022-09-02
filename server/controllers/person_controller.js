const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const Person = require("../models/person_models/person")

const getPersons = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const pageNumber = parseInt(req.query.page);
        const personGroup = req.query.personGroup;
        const activePerson = req.query.activePerson;
        
        queriesControl();
        if (!isNaN(pageNumber)) {
            const numberOfPerson = 10;
            const totalPageCount = Math.ceil(await Person.find({ userID: selectedUser._id }).count() / numberOfPerson);
            console.log(totalPageCount);
            const persons = await Person.find({ userID: selectedUser._id })
                .skip((pageNumber - 1) * numberOfPerson)
                .limit(numberOfPerson);
            res.json(persons);
        } else {
            const persons = await Person.find({ userID: selectedUser._id });
            res.json(persons);
        }

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const getPerson = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const person = await Person.findById(req.params.id).and({ userID: selectedUser._id });
        res.json(person);
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const addPerson = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const person = new Person(req.body);
        person.userID = selectedUser._id;
        newPerson = await person.save();
        res.json(newPerson);
    } catch (error) {
        next(createHttpError(500, error));
    }
}

const updatePerson = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const personID = req.params.id;
        const personNewInfo = await Person.findByIdAndUpdate(personID, { new: true, runValidators: true })
            .and({ userID: selectedUser._id });
        if (personNewInfo) {
            res.json(personNewInfo);
        } else {
            next(createHttpError(400, 'User not found'));
        }

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const deletePerson = async (req, res, next) => {
    try {
        const selectedUser = req.user;
        const personID = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personID)
            .and({ userID: selectedUser._id });
        if (deletedPerson) {
            res.json(deletedPerson);
        } else {
            next(createHttpError(400, 'User not found'));
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}


module.exports = {
    getPersons,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
}

function queriesControl(){

}