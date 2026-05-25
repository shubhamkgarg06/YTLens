import InputBox from "./Input_box";

function Chatblock({ darkMode }) {
  return (
    <div className={`relative h-full flex flex-col w-full max-w-6xl p-4 rounded-2xl overflow-hidden ${darkMode ? 'bg-[rgb(18,22,30)]' : 'bg-gray-300'} `}>

      <div className="flex-1 overflow-y-auto">

      </div>
      

      <div className="absolute
        bottom-6
        left-1/2
        -translate-x-1/2
        w-[92%]
        z-50">
        <InputBox darkMode={darkMode} />
      </div>
    </div>
    );  
}

export default Chatblock;