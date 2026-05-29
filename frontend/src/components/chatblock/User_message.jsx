import { UserRound } from 'lucide-react';


function UserMessage({content}) {

    return (
        <div className="flex justify-end items-end gap-3 my-4">
            

            <div
              className="
                max-w-[75%]
                px-5 py-3
                rounded-2xl
                bg-gray-100
                border border-gray-200
                text-gray-800
                dark:bg-gray-700
                dark:border-gray-600
                dark:text-white
              "
            >
              {content}
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
              <UserRound size={20} className="text-white" />
            </div>

        </div>
    );
}

export default UserMessage;