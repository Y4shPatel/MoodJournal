const Mood = require('../Models/Mood')
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const getMoods = async (req,res) => {
    try{

        const userId = req.user._id;

        const moods = await Mood.find({user: userId}).sort('createdAt');
        res.status(StatusCodes.OK).json({ moods, count: moods.length });
    }
        catch(err){
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).json({message: "Error loadin all Moods"});
    }
}



const createMood = async (req,res) => {
    try{

        const userId = req.user._id;

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User ID is missing in the request' });
        }

        req.body.user = userId
        const mood = await Mood.create(req.body);

        res.status(StatusCodes.CREATED).json({mood})
    }

    catch(err)
        {
        console.error('Error in createMood:', err);

         if(err.name == 'ValidationError'){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'Validation error', details: err.message})
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
        }
   
}



const deleteMood = async (req, res) => {
    try{
        const userId = req.user._id; 
        const moodId = req.params.id.trim();


        if (!mongoose.Types.ObjectId.isValid(moodId)) {
        return res.status(400).json({ message: "Invalid ID format" });
        }


        const mood = await Mood.findOneAndDelete({ _id: moodId, user: userId }); 

        if (!mood) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No mood found with ID ${moodId}` });
        }

        res.status(StatusCodes.OK).json({ message: "Mood deleted successfully" }); 

    }
    
    catch (err) {
        console.error('Error deleting mood:', err);
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Failed to delete mood" });
    }
}


module.exports = {
  getMoods,
  createMood,
  deleteMood
};