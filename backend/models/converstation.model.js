import mongoose from "mongoose";

const converstationSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    }
  ]
}, { timestamps: true })

const Converstation = mongoose.model("Converstation", converstationSchema);

export default Converstation;