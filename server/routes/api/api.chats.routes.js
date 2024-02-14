const router = require('express').Router();
const { Chat, ChatMessage, User } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
      let chats = await Chat.findAll({raw: true});
      // let users []
      //  chats.map(async(el) => {
      //   const user = await User.findOne({where: {id: el.receiver_id}, raw: true});
      //   // console.log(user);

      //   // return{... el, receiver: user}
      //   // chats[i].receiver_id = user.name
      // } )
      
      res.json({ chats });
    } catch ({ message }) {
      res.json({ type: 'chats load router error', message });
    }
  });

  router.get('/messages', async (req, res) => {
    try {
      const chatMessages = await ChatMessage.findAll();
      // console.log(chatMessages);
      res.json({ messages: chatMessages });
    } catch ({ message }) {
      res.json({ type: 'chatMessages load router error', chatMessages });
    }
  });

  router.post('/createChat', async (req, res) => {
    const {senderId, receiverId} = req.body;
    try {
      const chat = await Chat.create({
        sender_id: senderId, receiver_id: receiverId
    });
     
      res.json(chat);
    } catch ({ message }) {
      res.json({ type: 'createChat router error', message});
    }
  });

  module.exports = router;
