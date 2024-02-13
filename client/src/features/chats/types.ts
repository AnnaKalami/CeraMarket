export type Chat = {
    id:number
    sender_id:number
    receiver_id:number
  }

  export type ChatsState = {
    chats: Chat [],
    error: string | undefined;
    // loading: boolean
  }

  export type CurrentChat = Chat | undefined

  export type Message = {
    id:number
    user_id:number
    chat_id:number
    message: string
  }

  export type MessagesState = {
    messages: Message [],
    error: string | undefined;
    // loading: boolean
  }

 