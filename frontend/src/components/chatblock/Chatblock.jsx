import InputBox from "./Input_box";
import UserMessage from "./User_message";
import AI_Message from "./AiMessage/AI_message";
import { useEffect, useRef} from "react";
import useChatblockMessages from "../../context/ChatblockMessagesContext";

function Chatblock({player}) {

  const bottomRef = useRef(null)
  const { messages } = useChatblockMessages();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
        behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className={`relative h-full flex flex-col w-full max-w-6xl p-4 rounded-2xl overflow-hidden dark:bg-[rgba(19,22,30,0.77)] bg-gray-300 `}>

      <div className="flex-1 overflow-y-auto gap-2 p-4">
        {messages.map((msg, index) => {
          if(msg.type === "user"){
            return <UserMessage key={index} content={msg.content} />
          } else {
            return <AI_Message key={index} content={msg.content} player={player} />
          }
        })}

         <div ref={bottomRef} />
      </div>
      

      <div>
        <InputBox/>
      </div>
    </div>
    );  
}

export default Chatblock;