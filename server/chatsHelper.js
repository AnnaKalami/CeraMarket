const { Chat, ChatMessage } = require('./db/models');

async function saveMessage(message, userId, chatId) {

try {       

    await ChatMessage.create({
        user_id: userId,
        chat_id: chatId,
        message: message
       
    });

        return message;
} catch (error) {
        
        console.error('Ошибка при сохранении сообщения в базу данных:', error);
        throw error; 
}
}

module.exports =  saveMessage