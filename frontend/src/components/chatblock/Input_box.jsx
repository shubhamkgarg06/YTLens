import { SendHorizontal } from 'lucide-react';

function InputBox() {
    return (
        <div className="gap-2 width-full border-2 border-gray-300 rounded-xl p-2">
            
            <div>
                <input
                    type="text"
                    placeholder="Ask anything about the video..."
                    className="w-full text-white outline-none text-sm bg-transparent overflow-auto"
                />
            </div>

            <div className="flex justify-end">
                <button className="px-2 py-1 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors duration-200">
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
}

export default InputBox;