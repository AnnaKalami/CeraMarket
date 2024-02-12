const router = require('express').Router();
const { Chat, ChatMessage } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
      const chats = await Chat.findAll();
      console.log(chats);
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

  module.exports = router;


  // {
  //   attributes: { exclude: ['user_id'] }
  // }