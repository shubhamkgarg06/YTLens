import { SlidersHorizontal } from 'lucide-react';
import RetrivalThreshold from './RetrivalThrehshold';
import RetrievalScoresTable from './RetrivedChunkScore/RetrivalChunks';

function RetrivalBlock({queryData}) {

    return (
        <div className="border

                 dark:border-gray-700
                 border-gray-300

                 p-4
                 space-y-2

                 rounded-xl

                 dark:bg-gray-900
                 bg-white

                 shadow-sm
                 ">

            <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-2">
                    
                    <SlidersHorizontal
                      size={18}
                      className="text-orange-400"
                    />
                
                    <p
                      className="
                        text-base
                        font-semibold
                    
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Retrievals
                    </p>
                    
                  </div>
                    
                  <span
                    className="
                      px-2 py-1
                    
                      rounded-full
                    
                      text-xs
                    
                      bg-gray-100
                      dark:bg-slate-800
                    
                      text-gray-600
                      dark:text-slate-400
                    "
                  >
                    Top-K Filters
                  </span>
                    
            </div>

            <div className="flex flex-col gap-4"> 

            <RetrivalThreshold thresholds={queryData?.data?.retrival?.threshold}/>

            <RetrievalScoresTable scores={queryData?.data?.retrival?.scores}/>
            </div>





            
            
        </div>
    );
}

export default RetrivalBlock;
