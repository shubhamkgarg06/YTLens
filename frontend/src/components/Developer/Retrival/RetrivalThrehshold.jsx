function RetrivalThreshold({thresholds}) {
    
    return(

        <div className="">
    
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer">

                  {/* Vector */}
                  <div
                    className="
                      rounded-xl

                      border
                      border-blue-200
                      dark:border-blue-500/30

                      bg-blue-50
                      dark:bg-blue-500/10

                      p-3

                      hover:scale-[1.02]
                      transition-all
                    "
                            >
                        <div className="text-xs font-semibold uppercase tracking-wider text-center text-blue-700 dark:text-blue-300">
                          Vector
                        </div>

                        <div className="mt-1 text-base font-semibold text-center text-gray-900 dark:text-white">
                          {thresholds?.vector ?? "-"}
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

                        hover:scale-[1.02]
                        transition-all
                      "
                  >
                    <div className="text-xs uppercase tracking-wider font-semibold text-center text-amber-700 dark:text-amber-300">
                      BM25
                    </div>

                    <div className="mt-1 text-base font-semibold text-center text-gray-900 dark:text-white">
                      {thresholds?.bm25 ?? "-"}
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

                        hover:scale-[1.02]
                        transition-all
                      "
                  >
                    <div className="text-xs uppercase tracking-wider font-semibold text-center text-purple-700 dark:text-purple-300">
                      RRF
                    </div>

                    <div className="mt-1 text-base font-semibold text-center text-gray-900 dark:text-white">
                      {thresholds?.rrf ?? "-"}
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

                        hover:scale-[1.02]
                        transition-all
                       "
                  >
                    <div className="text-xs uppercase tracking-wider text-center  text-emerald-700 dark:text-emerald-300">
                      Reranking 
                    </div>

                    <div className="mt-1 text-base font-semibold text-center text-gray-900 dark:text-white">
                      {thresholds?.reranking ?? "-"}
                    </div>
                  </div>

            </div>

        </div>
        
    );
}

export default RetrivalThreshold