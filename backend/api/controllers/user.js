import { request, response } from 'express';
import * as userService from '../services/users.js';
import App from "../models/users.js";
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken.js';
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import sendEmail from '../utils/emailUtil.js'


// Function to handle Errors

const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
}

// Function for Successful request

const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

// This is used to call service SEARCH method of USER from controller after flow comes from route to controller
export const indexUser = async (req, res) => {

    try {
        const users = await userService.searchUser();
        setSuccessResponse(users, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }

};

// This is used to call service SEARCH method of VISIT from controller after flow comes from route to controller
export const indexParty = async (req, res) => {

    try {
        const party = await userService.searchParty();
        setSuccessResponse(party, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }

};

// Function to create a new User
export const saveUser = async (req, res) => {
    try {
        const user = { ...req.body };
        console.log("saveuser", user);

        const userExists = await userService.getUserByEmail(user);
        // Validates if a user exists with the same email Id
        if (userExists) {
            res.status(400).send("User Already Exists");
        }

        console.log("after if");

        // If no user with same email is found then here I have called Create/Save method in service to create a new user
        const newUser = await userService.createUser(user);
        const email = newUser.email;
        if (newUser) {
            // Below code snippet sends a Verification email
            const verificationToken = newUser.generateVerificationToken();
            const url = `http://localhost:3000/users/verify/${verificationToken}`
            sendEmail(email, url)
            return res.status(201).send({
                message: `Verification Email sent --- ` + email
            });
        }
        setSuccessResponse(newUser, res);
    }
    catch (e) {
        console.log("error", e)
        errorhandler(e.message, res);
    }
};

// This method is used to create a new visit request from a donor
export const saveParty = async (req, res) => {
    try {
        console.log('entering save party')
        const user = { ...req.body };

        const newParty = await userService.createParty(user);
        if (newParty) {
            res.status(200).json({
                _id: newParty._id,
                role: newParty.role,
                name: newParty.username,
            });
        }
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};

// The below function is used to send a GET request to fetch user information based on ID

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        setSuccessResponse(user, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};


// The below function is used to send a GET request to fetch Party information based on ID

export const getPartyById = async (req, res) => {
    try {
        const id = req.params.id;
        const visit = await userService.getVisit(id);
        setSuccessResponse(visit, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};

// The below function is used to update a user information
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = { ...req.body, id };
        const updatedUser = await userService.updateUser(user);
        setSuccessResponse(updatedUser, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};

// The below function is used to update Party information
export const updateParty = async (req, res) => {
    try {
        const id = req.params.id;
        const party = { ...req.body, id };
        const updatedParty = await userService.updateParty(party);
        setSuccessResponse(updatedParty, response);
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};

// Below function removes a user based on Id
export const removeUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.removeUser(id);
        setSuccessResponse({ message: `${id} removed successfully` }, res);
    }
    catch (e) {
        errorhandler(e.message, res);
    }

};

// Below function is used to authentiate a user by checking if username and password is correct or not
export const authUser = async (req, res) => {
    try {
        const user = { ...req.body };
        console.log("Password is : " + user.password);
        if (user.role === 'user'){
            console.log('')
            const userValid = await userService.authUser(user);
            // Control enters if conditon if the user is not verified
            if (!userValid.isVerified) {
                console.log('not verified   ')
                return res.status(403).send({
                    message: "Verify your Account."
                });
            }
            // validates if the role is valid.
            if (user.role === userValid.role) {
                console.log("BACK TO AUTH CONTROLLER");
                const password = userValid.password;
                //const comparePassword = await bcrypt.compare(user.password, password);
                console.log("MATCH RESULT" + (await bcrypt.compare(user.password, password)));
                // Comparing the input password with the encrypted password stored in db
                const comparePassword = await bcrypt.compare(user.password, password);
                if (userValid && (await bcrypt.compare(user.password, password))) {
                    console.log("Password matched");
                    res.status(200).json({
                        _id: userValid._id,
                        role: userValid.role,
                        username: userValid.username,
                        address: userValid.address,
                        city: userValid.city,
                        state: userValid.state,
                        zipcode: userValid.zipcode,
                        phonenum: userValid.phonenum,
                        email: userValid.email,
                        isVerified: userValid.isVerified
                    });
                }
                else {
                    console.log(res)
                    errorhandler("INVALID EMAIL OR PASSWORD", res);
                }
            }
            else {
                console.log(res)
                errorhandler("INVALID EMAIL OR PASSWORD", res);
            } 
        }
        else if(user.role === 'party'){
            console.log('inside party authorization')
            const partyValid = await userService.authParty(user);
            console.log(partyValid.role);
            console.log(user.role);
            if (user.role === partyValid.role) {
                console.log("BACK TO AUTH CONTROLLER");
                const password = partyValid.password;
                console.log("MATCH RESULT" + (await bcrypt.compare(user.password, password)));
                // Comparing the input password with the encrypted password stored in db
                const comparePassword = await bcrypt.compare(user.password, password);
                if (partyValid && (await bcrypt.compare(user.password, password))) {
                    console.log("Password matched");
                    res.status(200).json({
                        _id: partyValid._id,
                        role: partyValid.role,
                        username: partyValid.username,
                        address: partyValid.address,
                        city: partyValid.city,
                        state: partyValid.state,
                        zipcode: partyValid.zipcode,
                        phonenum: partyValid.phonenum,
                        email: partyValid.email
                    });
                }
                else {
                    console.log(res)
                    errorhandler("INVALID EMAIL OR PASSWORD", res);
                }
            }
            else {
                console.log(res)
                errorhandler("INVALID EMAIL OR PASSWORD", res);
            }
        }
        
    }
    catch (e) {
        errorhandler(e.message, res);
    }
};

// The below function verifies the user that is recieved using node mailer
export const verifyUser = async (req, res) => {
    const token = req.params.id;
    if (!token) {
        return res.status(422).send({
            message: "Missing Token"
        });
    }
    let payload = null
    try {
        payload = jwt.verify(
            token,
            "dgfgpspdifgskdfngussj490385jsp8ms",
        );
    } catch (err) {
        console.log("error");
        return res.status(500).send(err);
    }
    try {
        // Finding user by matching ID
        const userValid = await App.User.findOne({ _id: payload.ID }).exec();
        //const user = await User.findOne({ _id: payload.ID }).exec();
        if (!userValid) {
            return res.status(404).send({
                message: "User does not exists"
            });
        }
        // Updating user verification status to true
        userValid.isVerified = true;
        await userValid.save();
        return res.status(200).send({
            message: "Account Verified"
        });
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const bookTickets = async(req, res) => {
    const ticketsInfo = { ...req.body}
    try{
        const bookTicketsReq = await userService.bookTicketsService(ticketsInfo);
        res.status(201).json(ticketsInfo)
    }
    catch(err){
        console.log('Error: '+ err);
    }
}

export const getTickets = async(req, res) => {
    try{
        App.Ticket.find({}, (err, result)=>{
            res.status(200).json(result)
        });
        
    }
    catch(err){
        console.log('Error: '+err)
    }
}
// These are the transporter details, through which the mail would be sent to the user
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "support-wtp@gmail.com",
        pass: "whereistheparty"
    },
});


