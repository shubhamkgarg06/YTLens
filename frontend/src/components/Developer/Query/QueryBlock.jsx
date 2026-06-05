import OriginalQuerySelector from "./OriginalQuerySelector";
import ResponseQuery from "./ResponseQuery";
import { BookAudio } from 'lucide-react';

function QueryBlock({queryData , setQueryData}) {

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

            <div className="flex items-center gap-2 pb-2">

                <BookAudio size = {18} className="text-orange-400" />

                <p className="
                 text-base font-semibold
                 text-gray-900 dark:text-white
                ">
                    Query
                </p>

            </div>

            <OriginalQuerySelector setQueryData={setQueryData}/>
            <ResponseQuery label="Query Type" response={queryData==="" ? "N/A" : queryData.data.response_type} />

            {queryData?.data?.reformulated_query?.trim() && (
                <ResponseQuery
                    label="Reformulated Query"
                    response={queryData.data.reformulated_query}
                />
            )}
        </div>
    );
}

export default QueryBlock;
