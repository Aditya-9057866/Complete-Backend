const { default: mongoose } = require("mongoose")
const mon = require("mongoose")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    // kuch value aa rhi k nhi trim ye check kra h
    minlength:[3,'name must be atleast 3 characters']
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase:true,
    unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

  },
  age: {
    type: Number,
    default: 18,
    min:[1,"age can not be registered"]
  }

}
  , { timestamps: true })
module.exports=mongoose.model('User',userSchema)