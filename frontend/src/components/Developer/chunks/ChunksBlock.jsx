import {useState , useEffect} from 'react'

import { FileText } from 'lucide-react';

import ChunkDetails from './ChunkDetails';
import ChunkDetailsVectors from './ChunkDetailsVectors';


function ChunksBlock({queryData}) {

    const [chunks , setChunks] = useState([])

    const [scores , setScores] = useState({})

    function createRankMap(scoreObj) {

    const sortedChunks = Object.entries(scoreObj)
        .sort((a, b) => b[1] - a[1]);

    const rankMap = {};

    sortedChunks.forEach(([chunkId], index) => {
        rankMap[chunkId] = index + 1;
    });

    return rankMap;
  }

  const [scoreRanks, setScoreRanks] = useState({});

    useEffect( () => {

        if(queryData === ""){
            return
        }

        setChunks(queryData.data.chunks)
        setScores(queryData?.data?.retrival?.scores ?? {})

       

    }, [queryData])


    useEffect( () => {

        if (Object.keys(scores ?? {}).length === 0) {
          setScoreRanks({});
          return;
        }

      setScoreRanks({
          vector: createRankMap(scores.vector || {}),
          BM25: createRankMap(scores.BM25 || {}),
          rrf: createRankMap(scores.rrf || {}),
          reranking: createRankMap(scores.reranking || {})
      });

    } , [scores])

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
                 text-base font-semibold
                 text-gray-900 dark:text-white
                ">
                    Chunks 
                </p>

            </div>

            {(Object.keys(scores).length === 0) ?

            <div className="flex flex-col gap-2">

                {chunks.map((chunk , index) => {
                    return <ChunkDetails key={index} chunk={chunk} />
                })} 
            </div>

            :

            <div className="flex flex-col gap-2">
                {chunks.map((chunk , index) => {
                    return <ChunkDetailsVectors key={index} chunk={chunk}  scores={scores} chunk_id={chunk.metadata.chunk_index} scoreRanks={scoreRanks}/>
                })
                }
            </div>
            }
        </div>
    );
}

export default ChunksBlock;
