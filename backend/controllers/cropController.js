import cropModel from "../models/cropModel.js";
import fs from 'fs'

// all food list
const listCrops = async (req, res) => {
    try {
        const foods = await cropModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addCrops = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new cropModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeCrops = async (req, res) => {
    try {
        const food = await cropModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await cropModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listCrops, addCrops, removeCrops }