import { useState } from "react";
import { FolderCode } from 'lucide-react';

function DeveloperModeSwitch({darkMode}) {

  const [enabled, setEnabled] = useState(false);

  return (
    <div className={`flex items-center gap-2 backdrop-blur-md border ${darkMode ? "border-white/20" : "border-black/20"} p-2 w-fit rounded-xl`}>
      
      <FolderCode className={`w-4 h-4 text-[#db0a0a]`} strokeWidth={2} />
      
      <h2 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>
        Developer Mode
      </h2>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-4 rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-500"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>

    </div>
  );
}

export default DeveloperModeSwitch;