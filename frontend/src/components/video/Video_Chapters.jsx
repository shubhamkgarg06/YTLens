import { MessageSquareMore } from 'lucide-react';

function VideoChapters() {
    return (
        <div className="h-full bg-gray-800 rounded-lg p-2">
            
            <div className="flex items-center mb-2 text-sm border-b border-gray-400 p-1 gap-1">
                <MessageSquareMore className="inline-block mr-1 text-orange-400" />
                <h1 className="font-bold text-white">Chapters / Key Moments</h1>
            </div>

            {/* CONTENT */}
            <div className="space-y-2 text-sm p-2 flex gap-2">

                <div className="flex flex-col gap-1">

                    <span className="text-gray-400 font-medium">
                        Title:
                    </span>

                    


                </div>

                <div className="flex flex-col gap-1">

                    <span className="text-white ml-2 text-semibold">
                        Tech Insights
                    </span>

                    

                </div>


            </div>
        </div>
    );
}

export default VideoChapters;