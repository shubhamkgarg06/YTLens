

function ResponseQuery({label , response}) {

    return (

        <div className="space-y-1">

            <p className="text-xs text-gray-700 dark:text-gray-300">
                {label}
            </p>


            
                <div
                    className="
                    rounded-lg
                    border
                    border-gray-200
                    dark:border-gray-700
                    bg-gray-50
                    dark:bg-gray-800
                    px-1
                    py-1.5
                    text-xs
                    text-gray-700
                    dark:text-gray-300
                    overflow-y-auto
                  "
                >
                    {response}
                </div>
            
        </div>
    );
}

export default ResponseQuery;