import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Schema
const userSchema = new Mongoose.Schema({
    "role":{
        type: String,
        required: "Role is mandatory"
    },
    "username":{
        type: String,
        required: "Username is a required field"
    },
    "address":{
        type: String,
        required: "Address field is required"
    },
    "city":{
        type: String,
        required: "Enter the city"
    },
    "state":{
        type: String,
        required: "State Required"
    },
    "zipcode":{
        type: String,
        required: "zipcode"
    },
    "phonenum":{
        type: String,
        required: "Enter Phone Number"
    },
    "role": {
        type: String,
        required: "Role is required"
    },
    "email":{
        type: String,
        required: "Email is required",
        unique: true
    },
    "password":{
        type: String,
        default: "password is required"
    },
    "createDate": {
        type: Date,
        default: Date.now
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    },
    "isVerified":{
        type: Boolean, 
        required: "Verification is required",
        default: true 
    },
    "request": {
        type: [{}]
    }
},
    {
        versionKey: false
    }
);

// Party Schema
const partySchema = new Mongoose.Schema({
    "role":{
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true
    },
    "partyType": {
        type: String,
        required: true
    },
    "email":{
        type: String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "phonenum":{
        type: String,
        required: "contact is required"
    },
    "address":{
        type: String,
        required: true
    },
    "city":{
        type: String,
        required: "Enter the city"
    },
    "state":{
        type: String,
        required: "State Required"
    },
    "zipcode":{
        type: String,
        required: "zipcode"
    },
    "date": {
        type: Date,
        default:"2022-04-27"
        // required: "Date is required"
    },
    "time": {
        type: String,
        default:"21:04:33.062"
        // required: "Time is required"
    },
    "createDate": {
        type: Date,
        default: Date.now
    },
    "lastModifiedDate": {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false
}
);

const ticketsSchema = new Mongoose.Schema(
    {
        "firstname":{
            type: String,
            required:true
        },
        "lastname":{
            type: String,
            required:true
        },
        "email":{
            type: String,
            required:true
        },
        "phone":{
            type: String,
            required:true
        },
        "age":{
            type: String,
            required:true
        }
    },
    {
        versionKey: false
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log("SAVED password is" + this.password);
})

partySchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("SAVED password is" + this.password);
})

// This method is used to generate a verification token usign jwt for account verification through nodemailer.
userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        "dgfgpspdifgskdfngussj490385jsp8ms",
        { expiresIn: "7d" }
    );
    return verificationToken;
};

userSchema.virtual('id', () => this._id.toHexString());
userSchema.set('toJSON', { virtuals: true });

partySchema.virtual('id', () => this._id.toHexString());
partySchema.set('toJSON', { virtuals: true });

ticketsSchema.virtual('id', () => this._id.toHexString());
ticketsSchema.set('toJSON', { virtuals: true });

const User = Mongoose.model('users', userSchema);
const Party = Mongoose.model('party', partySchema);
const Ticket = Mongoose.model('tickets', ticketsSchema)

export default { User, Party, Ticket };

