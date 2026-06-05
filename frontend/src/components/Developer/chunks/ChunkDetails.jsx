import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format_seconds_to_time } from "../../../helpers/FormatDuration";

function ChunkDetails({ chunk}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="
        rounded-lg
        border
        border-gray-200
        dark:border-gray-700

        border-l-4
         border-l-emerald-500
         dark:border-l-emerald-500

        bg-white
        dark:bg-slate-800/80
        
        hover:bg-gray-50
        dark:hover:bg-slate-800

        hover:border-gray-300
        dark:hover:border-slate-600

        hover:shadow-md

        transition-all
        duration-200
        cursor-pointer
        overflow-hidden
      "
      onClick={() => setExpanded(!expanded)}
    >


      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1">
        <div className="font-semibold text-sm text-gray-900 dark:text-white">
          Chunk {chunk.metadata.chunk_index + 1}
        </div>

        

        <div className="flex items-center gap-2">
            {!expanded &&
                <span className="text-sm text-emerald-600 dark:text-emerald-400">
                  {format_seconds_to_time(chunk.metadata.start_time)}
                </span>
            }

          <ChevronDown
            size={14}
            className={`
                text-gray-900 dark:text-white
                transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
        
      </div>

      {/* Expandable Content */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${expanded ? "max-h-125" : "max-h-0"}
        `}
      >
        <div className="px-3 pb-3">
          {/* Content Label */}
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Content
          </div>

          {/* Transcript Content */}
          <div
            className="
              rounded-lg
              border

              border-gray-200
              dark:border-slate-700

              bg-gray-50
              dark:bg-slate-900

              p-3

              text-sm
              text-gray-700
              dark:text-gray-300

              leading-relaxed
              max-h-40
              overflow-y-auto
            "
          >
            {chunk.page_content}
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-3 mt-3">
            <div
              className="
                flex items-center gap-2
                rounded-md

                text-gray-700
              dark:text-gray-300

                px-3
                py-1.5

                text-xs
              "
            >

              <span className="text-gray-500 dark:text-gray-400">Start</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {format_seconds_to_time(chunk.metadata.start_time)}
              </span>
            </div>

            <div
              className="
                flex items-center gap-2
                rounded-md

                bg-gray-100
                dark:bg-slate-700

                px-3
                py-1.5
                text-xs
              "
            >
              <span className="text-gray-500 dark:text-gray-400">
                End
              </span>

              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {format_seconds_to_time(chunk.metadata.end_time)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChunkDetails;