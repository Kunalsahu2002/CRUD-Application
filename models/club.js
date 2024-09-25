const mongoos = require("mongoose")
const schema = mongoos.Schema;

let clubSchema = new schema({
    name:{
        type:String
    },
    email:{
        type:String

    }
})

module.exports = mongoos.model('test1',clubSchema)