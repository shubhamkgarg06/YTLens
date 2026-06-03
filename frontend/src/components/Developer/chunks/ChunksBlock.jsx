import {useState , useEffect} from 'react'

import { FileText } from 'lucide-react';

import ChunkDetails from './ChunkDetails';


function ChunksBlock({queryData}) {

    const [chunks , setChunks] = useState([
        {page_content: "let me show you so I'm going to start with this Loop for X in range five colon now inside of this Loop I'm going to add another loop so for y in range three colon and then in our second Loop I'm going to add a print statement here we can use formatted strings to display coordinates remember formatted strings so we have F followed by quotes now here we add parentheses for our coordinates first we want to display X and then comma followed by y let's run this program and see what happens there you go pretty cool isn't it so we get zero and zero 0o and one zero and two then we get one and zero one and one one and two and so on now let me explain how exactly python interpreter executes this code so here we have two Loops this is what we call the outer loop and this is the inner loop so the execution of our program starts here in the first iteration of this Loop X is zero now we get to this statement which is a child of this four statement because it's indented four times this statement itself is a loop so what we have inside ",
        metadata: {
            chunk_index: 76,
            video_id: "K5KVEU3aaeQ",
            start_time: 5455.8,
            end_time: 5544.4800000000005
        }}
    ])

    useEffect( () => {

        if(queryData === ""){
            return
        }

        setChunks(queryData.data.chunks)

    }, [queryData])

    return (
        <div className="border
                 dark:border-gray-700
                 border-gray-300
                 p-4
                 space-y-2
                 rounded-xl
                 dark:bg-gray-900
                 bg-white
                 shadow-sm">

            <div className="flex items-center gap-2 pb-2">

                <FileText size = {18} className="text-orange-400" />

                <p className="
                 text-sm font-semibold
                 text-gray-900 dark:text-white
                ">
                    Chunks 
                </p>

            </div>

            <div className="flex flex-col gap-1">

                {chunks.map((chunk , index) => {
                    return <ChunkDetails key = {index} chunk={chunk} />
                })} 
            </div>
        </div>
    );
}

export default ChunksBlock;
