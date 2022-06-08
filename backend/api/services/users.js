import App from "../models/users.js";

// Function to search in the USER colection

export const searchUser = (params = {}) => {
    const promise = App.User.find(params).exec();
    return promise;
};

// Function to search in the PARTY colection

export const searchParty = (params = {}) => {
    const promise = App.Party.find(params).exec();
    return promise;
};

// Function to create a new User

export const createUser = (user) => {
    const newUser = new App.User(user);
    return newUser.save();
}

// Function to create a new Party

export const createParty = (party) => {
    const newParty = new App.Party(party);
    return newParty.save();
}


// Function to fetch user based on email address

export const getUserByEmail = (user) => {
    const email = user.email;
    const promise = App.User.findOne({ email: email }).exec();
    return promise;
}
// Function to fetch party based on email address

export const getPartyByEmail = (party) => {
    const email = party.email;
    const promise = App.Party.findOne({ email: email }).exec();
    return promise;
}

// Function to fetch user based on id

export const getUserById = (id) => {
    const promise = App.User.findById(id).exec();
    return promise;
}

// Function to fetch Party based on id

export const getPartyById = (id) => {
    const promise = App.Party.findById(id).exec();
    return promise;
}

// Function to update user

export const updateUser = (user) => {
    console.log("SERVICE");
    user._id = user.id;
    user.lastModifiedDate = Date.now();

    const promise = App.User.findByIdAndUpdate(user.id, user, { new: true }).exec();
    return promise;
}

// Function to update Party

export const updateParty = (party) => {
    party._id = party.id;
    party.lastModifiedDate = Date.now();

    const promise = App.Visit.findByIdAndUpdate(party.id, party, { new: true }).exec();
    return promise;
}

// Function to delete user by ID

export const removeUser = (id) => {
    const promise = App.User.findByIdAndRemove(id).exec();
}


// Function to validates if a user is authorized or not

export const authUser = (user) => {
    const email = user.email
    const password = user.password;
    const promise = App.User.findOne({ email: email }).exec();
    return promise;

}

export const authParty = (party) => {
    const email = party.email
    const password = party.password;
    const promise = App.Party.findOne({ email: email }).exec();
    return promise;

}

export const bookTicketsService = (ticketInfo)=>{
    const newTicket = new App.Ticket(ticketInfo)
    return newTicket.save();
} 

export const getTicketsService = () => {
    const promise = App.Ticket.find();
    return promise;
}
