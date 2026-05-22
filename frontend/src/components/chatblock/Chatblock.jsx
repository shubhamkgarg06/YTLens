import InputBox from "./Input_box";

function Chatblock() {
  return (
    <div className="h-full flex flex-col w-full max-w-6xl p-4 bg-[rgb(18,22,30)] shadow-2xl rounded-2xl">

      <div className="flex-1">

      </div>
      

      <div className="mt-auto">
        <InputBox />
      </div>
    </div>
    );  
}

export default Chatblock;