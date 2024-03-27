import {Station} from "../models/stationModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//register train

const registerStation= asyncHandler(async(req,res)=>{
    const {stationName,stationNumber,platformCount} = req.body;
    
    const station = await Station.create({
        stationName,
        stationNumber,
        platformCount
    });
    if(!station){
        return res.json(new ApiError(401,"Unexpected error"));
    }

    return res.json(new ApiResponse(200,station));
});

const getStationDetails = asyncHandler(async(req,res)=>{
    const station = (await Station.find({stationNumber:req.params.id}))[0];
    return res.json(new ApiResponse(200,station));
});


const updateStation = asyncHandler(async(req,res)=>{
    const {stationName,stationNumber,platformCount} = req.body;
    const station = (await Station.find({stationNumber:stationNumber}))[0];
    if(!station){
        return res.json(new ApiError(401,"Station not found"));
    }
    if(stationName){station.stationName = stationName;}
    if(platformCount){station.platformCount = platformCount;}

    await station.save();
    return res.json(new ApiResponse(200,station));
});



export {registerStation,getStationDetails,updateStation};