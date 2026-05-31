import { SendHorizontal } from 'lucide-react';
import useVideo from '../../context/VideoContext';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

function InputBox({setMessages }) {

    const [input, setInput] = useState("");
    const [LoadingAiMessage, setLoadingAiMessage] = useState(false)

    const { videoID } = useVideo();

    const handleSubmit = async () => {

        if(LoadingAiMessage) return;
        

        // Add the user's message to the chat
        setMessages(prevMessages => [...prevMessages, { type: "user", content: input }]);
        setInput("");
        setLoadingAiMessage(true)

        if (videoID === "") {
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        type: "ai",
                        content: "Please enter a valid YouTube video URL first."
                    }
                ]);
            }, 1000);

            setLoadingAiMessage(false)
            return;
        }

        try{

            const res = await fetch(`http://127.0.0.1:8000/${videoID}/ask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                }),
            });

            const data = await res.json();

            // Add the AI's response to the chat
            setMessages(prevMessages => [...prevMessages, { type: "ai", content: data.response }]);

            // console.log("AI response:", data.response);
        }
        catch(error){
            console.error(error);
            setMessages(prevMessages => [...prevMessages, { type: "ai", content: "Sorry, there was an error processing your request." }]);
            // alert("Backend connection failed");
        }

        setLoadingAiMessage(false)

        return;
        
    }
        
    return (
        <>
            <form className={`
                gap-2 w-full 
                border-2 
                backdrop-blur-md
                    dark:border-gray-600 dark:focus-within:border-gray-500 dark:focus-within:shadow-gray-500/20 dark:focus-within:shadow-xl
                    border-gray-400 focus-within:border-gray-800 focus-within:shadow-gray-800/20 focus-within:shadow-xl
                rounded-xl p-2 
                shadow-lg
                transition-all duration-300
                `}

                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    // Handle message submission logic here
                }}>

                    <div>
                        <input
                            type="text"
                            placeholder="Ask anything about the video..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full dark:text-white dark:placeholder:text-gray-500 text-gray-800 placeholder:text-black outline-none text-sm bg-transparent overflow-auto`}
                        />
                    </div>
            
                    <div className="flex justify-end">


                        <button
                            type="submit"
                            className="px-2 py-1 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors duration-200">

                                {LoadingAiMessage ? <LoaderCircle className="animate-spin" /> : <SendHorizontal />}
                            {/* <SendHorizontal /> */}
                        </button>


                    </div>
            </form>
        </>
    );
}

export default InputBox;