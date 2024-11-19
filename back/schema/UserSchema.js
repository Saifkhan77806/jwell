const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    profile: {
        type: String
    },
    id: {
        type: String
    },
    provider: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password:{
        type: String
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    credits:{
        type: Number,
        default: 0
    },
    subscription:{
        type: String,
    },
    expires:{
        type: String
    },
    partcredit:{
        type: Number,
        default: 0
    },
    member:{
        type: Array,
        default: null
    },
    verifyOtp:{
        type: String
    },
    history:[
        {
            imgurl: {
                type: String
            },
            prompts:{
                type: String
            }

        }
    ]

})



userSchema.methods.addhistory = async function (imgurl, prompts) {
    try{
        this.history = this.history.concat({imgurl, prompts});
        await this.save;
        return this.history;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User