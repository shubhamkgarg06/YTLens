import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import TimeStampRenderer from "./TimeStampRenderer";


function formatMarkdown(text) {
  text = text
    // blank line between sentences/paragraphs starting with capital
    .replace(/([^\n-*\d#].*[.!?])\n([A-Z])/g, '$1\n\n$2')
    // blank line before a list only from plain text (not between list items)
    .replace(/([^\n\-*\d>].*)\n([ \t]*[-*] )/g, '$1\n\n$2')
    // blank line before numbered lists from plain text
    .replace(/([^\n\-*\d>].*)\n(\d+\. )/g, '$1\n\n$2')
    // blank line before headings
    .replace(/([^\n])\n(#{1,6} )/g, '$1\n\n$2')
    // remove blank lines BETWEEN list items (fixes over-spacing)
    .replace(/([ \t]*[-*] .+)\n\n([ \t]*[-*] )/g, '$1\n$2')
    // collapse 3+ newlines to 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}


function AIMessage({ content, player }) {

  // console.log("Rendering AIMessage with content:", content);


  return (

    <div className="flex justify-start items-end gap-3 my-4 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
        <Bot size={20} className="text-white" />
      </div>

      <div className="max-w-[75%] px-5 py-3 rounded-2xl bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="prose prose-sm prose-gray max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{

              p: ({ children }) => (
                <TimeStampRenderer Tag="p" player={player}>
                  {children}
                </TimeStampRenderer>
              ),

              li: ({ children }) => (
                <TimeStampRenderer Tag="li" player={player}>
                  {children}
                </TimeStampRenderer>
              ),

            }

            }
          >
            {formatMarkdown(content)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default AIMessage;