import { Book } from 'lucide-react';

function VideoInfo() {
    return (
        <div className="h-full bg-gray-800 rounded-lg p-2">
            <div className="flex items-center mb-2 text-sm border-b border-gray-400 p-1 gap-1">
                <Book className="inline-block mr-1 text-orange-400" />
                <h1 className="font-bold text-white">Video Info</h1>
            </div>

            {/* CONTENT */}
            <div className="space-y-2 text-md p-2 flex gap-2">

                <div className="flex flex-col gap-2">

                    <span className="text-gray-400 font-medium">
                        Title:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Channel:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Duration:
                    </span>

                    <span className="text-gray-400 font-medium">
                        Published:
                    </span>


                </div>

                <div className="flex flex-col gap-2">

                    <span className="text-white ml-2 text-semibold">
                        Tech Insights
                    </span>

                    <span className="text-white ml-2 text-semibold">
                        Tech Insights
                    </span>

                    <span className="text-white ml-2 text-semibold">
                        10:30
                    </span>

                    <span className="text-white ml-2 text-semibold  ">
                        Jan 15, 2024
                    </span>

                </div>


            </div>
            

        </div>
    );
}

export default VideoInfo;