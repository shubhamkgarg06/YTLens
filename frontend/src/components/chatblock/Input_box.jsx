import { SendHorizontal } from 'lucide-react';

function InputBox() {
    return (
        <div className={`
        gap-2 w-full 
        border-2 
        backdrop-blur-md
            dark:border-gray-600 dark:focus-within:border-gray-500 dark:focus-within:shadow-gray-500/20 dark:focus-within:shadow-xl
            border-gray-400 focus-within:border-gray-800 focus-within:shadow-gray-800/20 focus-within:shadow-xl
        rounded-xl p-2 
        shadow-lg
        transition-all duration-300
        
        `
        }>
            
            <div>
                <input
                    type="text"
                    placeholder="Ask anything about the video..."
                    className={`w-full dark:text-white dark:placeholder:text-gray-500 text-gray-800 placeholder:text-black outline-none text-sm bg-transparent overflow-auto`}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-2 py-1 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors duration-200">
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
}

export default InputBox;