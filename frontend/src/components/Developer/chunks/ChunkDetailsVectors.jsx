import { useState , useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { format_seconds_to_time } from "../../../helpers/FormatDuration";

function ChunkDetailsVectors({ chunk, scores, chunk_id , scoreRanks }) {

  const [expanded, setExpanded] = useState(false);

  console.log(scoreRanks)

  return (
    <div
      className="
        rounded-lg

        border
        border-gray-200
       dark:border-slate-700

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
         duration-300

         cursor-pointer
         overflow-hidden
      "
      onClick={() => setExpanded(!expanded)}
    >


      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1">
        <div className="font-semibold text-base text-gray-900 dark:text-white">
          Chunk {chunk_id}
        </div>



        <div className="flex items-center gap-3">
          {!expanded &&
            <div className="flex items-center gap-5">
              <span
                className="
                  px-2 py-1
                  rounded-full

                  bg-emerald-50
                  dark:bg-emerald-900/20

                  border
                border-emerald-200
                dark:border-emerald-500/20

                  text-emerald-700
                  dark:text-emerald-400

                  text-xs
                  font-semibold
                "
              >
                Score: {scores?.reranking?.[chunk_id]?.toFixed(5) ?? "-"}
              </span>

              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {format_seconds_to_time(chunk.metadata.start_time)}
              </span>
            </div>
          }

          <ChevronDown
            size={14}
            className={`
                text-gray-900 dark:text-white
                transition-transform duration-200 ${expanded ? "rotate-180" : ""
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
          ease-in-out
          ${expanded ? "max-h-125" : "max-h-0"}
        `}
      >
        <div className="flex flex-col gap-3 p-3">

          {/* content */}

          <div className="">
            {/* Content Label */}
            <div className="text-xs font-semibold uppercase tracking-wider
             text-gray-500
            dark:text-slate-400"
             >
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

                  leading-8

                  text-sm
                  text-gray-700
                  dark:text-slate-300

                  
                  max-h-40
                  overflow-y-auto
                "
            >
              {chunk.page_content}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3 mt-2">

            <div
              className="
                rounded-xl

                bg-gray-100
                dark:bg-slate-700/40

                px-4
                py-3
              "
            >
              <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                Start
              </div>

              <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                {format_seconds_to_time(chunk.metadata.start_time)}
              </div>
            </div>

            <div
              className="
                rounded-xl
                bg-slate-700/40

                px-4
                py-3
              "
            >
              <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                End
              </div>

              <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                {format_seconds_to_time(chunk.metadata.end_time)}
              </div>
            </div>

          </div>

          {/* Scores */}

          <div>
            <div className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Retrieval Ranks
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {/* Vector */}
              <div
                className="
                  rounded-lg

                  border
                  border-blue-200
                  dark:border-blue-500/30

                  bg-blue-50
                  dark:bg-blue-500/10

                  p-3
                "
                        >
                <div className="text-xs uppercase tracking-wider text-center text-blue-700 dark:text-blue-300">
                  Vector
                </div>

                <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                  # {scoreRanks?.vector?.[chunk_id] ?? "-"}
                </div>
              </div>

              {/* BM25 */}
              <div
                className="
                    rounded-lg

                    border
                    border-amber-200
                    dark:border-amber-500/30

                    bg-amber-50
                    dark:bg-amber-500/10

                    p-3
                  "
              >
                <div className="text-xs uppercase tracking-wider text-center text-amber-700 dark:text-amber-300">
                  BM25
                </div>

                <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                  # {scoreRanks?.BM25?.[chunk_id] ?? "-"}
                </div>
              </div>

              {/* RRF */}
              <div
                className="
                    rounded-lg

                    border
                    border-purple-200
                    dark:border-purple-500/30

                    bg-purple-50
                    dark:bg-purple-900/20

                    p-3
                  "
              >
                <div className="text-xs uppercase tracking-wider text-center text-purple-700 dark:text-purple-300">
                  RRF
                </div>

                <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                  # {scoreRanks?.rrf?.[chunk_id] ?? "-"}
                </div>
              </div>

              {/* Reranking */}
              <div
                className="
                     rounded-lg

                     border
                     border-emerald-300
                     dark:border-emerald-500/40
                      
                     bg-emerald-50
                     dark:bg-emerald-500/10
                      
                     px-2
                     py-3
                   "
              >
                <div className="text-xs uppercase text-center  text-emerald-700 dark:text-emerald-300">
                  Reranking
                </div>

                <div className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                  # {scoreRanks?.reranking?.[chunk_id] ?? "-"}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChunkDetailsVectors;