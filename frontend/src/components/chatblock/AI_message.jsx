import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";



function AIMessage({content}) {
  return (
    <div className="flex justify-start items-end gap-3 my-4 opacity-0  animate-[fadeIn_0.3s_ease-out_forwards]">
      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
        <Bot size={20} className="text-white" />
      </div>

      <div
        className="
          max-w-[75%]
          px-5 py-3
          rounded-2xl
          bg-gray-100
          border border-gray-200
          text-gray-800
          dark:bg-gray-700
          dark:border-gray-600
          dark:text-white
        "
      >
        <div className="
              prose
              dark:prose-invert
              max-w-none
            ">
                <ReactMarkdown

                  >
                    {content}
                  </ReactMarkdown>

          </div>
      </div>
    </div>
  );
}

export default AIMessage;