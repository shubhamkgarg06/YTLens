import QueryBlock from "./Query/QueryBlock";
import ChunksBlock from "./chunks/ChunksBlock";
import { SquareCode } from 'lucide-react';
import {useState} from 'react'

function DeveloperMode() {

    const [queryData , setQueryData] = useState("")

    return (
        <div className={`relative h-full flex flex-col w-full max-w-6xl p-4 rounded-2xl overflow-auto dark:bg-gray-800  bg-gray-300 `}>

            {/* HEADER */}
            <div className="
             flex items-center gap-2 pb-2">
                <SquareCode className=" text-red-500" />

                <h1 className="
                 text-lg font-semibold
                 text-gray-900 dark:text-white
                ">
                    Developer Panel
                </h1>

            </div>

            <div className="flex flex-col h-full gap-2 overflow-y-auto">
                <div className="h-1/2 overflow-auto">
                    <QueryBlock queryData={queryData} setQueryData={setQueryData}/>
                </div>
                
                <div className="h-1/2 overflow-auto">
                    <ChunksBlock queryData={queryData} />
                </div>
                
            </div>
        </div>
    );
}

export default DeveloperMode;