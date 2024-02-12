// const { Chat, ChatMessage } = require('./db/models');

// async function saveMessage(message, userId, chatId) {


//     try {
       
//        const  senderChat = await Chat.findOne({
//             sender_id: userId,
//         });
            

//        const  receiverChat = await Chat.findOne({
//                      receiver_id: userId,
//                     }) 
                   
//         let userChat
//         if (senderChat) {
//             userChat=senderChat
//         } else if (receiverChat) {
//             userChat = receiverChat
//         } else {
//             userChat = await Chat.create({sender_id: userId,receiver_id: })
//         }
      
//     }       

//     await ChatMessage.create({
//         sender_id: userId,
//         chat_id: chatId,
//         message: message
       
//     });

//         return message;
//     } catch (error) {
        
//         console.error('Ошибка при сохранении сообщения в базу данных:', error);
//         throw error; 
// }
// }

// module.exports =  saveMessage