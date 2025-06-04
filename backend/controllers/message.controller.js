import Converstation from "../models/converstation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let converstation = await Converstation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!converstation) {
      converstation = await Converstation.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if (newMessage) {
      converstation.messages.push(newMessage._id)
    }

    await Promise.all([converstation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("error in send message controller: ", error.message);
    res.status(500).json({ error: "internal server error" })
  }
}

export const getMessage = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const converstation = await Converstation.findOne({
      participants: {$all: [senderId, userToChatId]}
    }).populate("messages");

    if(!converstation){
      return res.status(200).json([]);
    }

    const messages = converstation.messages;

    res.status(200).json(messages);

  } catch (error) {
    console.log("error in send message controller: ", error.message);
    res.status(500).json({ error: "internal server error" })
  }
}