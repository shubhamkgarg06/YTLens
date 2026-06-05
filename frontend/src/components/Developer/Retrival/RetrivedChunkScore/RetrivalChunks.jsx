import {useState , useEffect } from "react";

export default function RetrievalScoresTable({scores}) {

    const [sortBy, setSortBy] = useState("reranking");
    const[tableData , setTableData] = useState([])

    const formatScore = (score) => {
        if (score == null) return "-";

        if (Math.abs(score) < 0.0001) {
            return score.toExponential(2);
        }

        return Number(score).toPrecision(4);
    };


    useEffect( () => {

        if(!scores){
            setTableData([])
            return;
        }

        const allChunkIds = [
            ...new Set(
                Object.values(scores)
                    .flatMap(method => Object.keys(method))
            )
        ]; 

        const rows = allChunkIds.map(chunkId => ({
            chunkId: Number(chunkId),
            vector: scores.vector?.[chunkId] ?? null,
            BM25: scores.BM25?.[chunkId] ?? null,
            rrf: scores.rrf?.[chunkId] ?? null,
            reranking: scores.reranking?.[chunkId] ?? null
        }));



        const tieBreakOrder = [
            "reranking",
            "rrf",
            "vector",
            "BM25"
        ];

        rows.sort((a, b) => {

            if (sortBy === "chunkId") {
                return a.chunkId - b.chunkId;
            }

            const primaryDiff =
                (b[sortBy] ?? -Infinity) -
                (a[sortBy] ?? -Infinity);

            if (primaryDiff !== 0) {
                return primaryDiff;
            }

            for (const field of tieBreakOrder) {

                if (field === sortBy) continue;

                const diff =
                    (b[field] ?? -Infinity) -
                    (a[field] ?? -Infinity);

                if (diff !== 0) {
                    return diff;
                }
            }

            return a.chunkId - b.chunkId;
        });

        setTableData(rows);
        

        

    } , [scores , sortBy])



    const columns = [
        { key: "chunkId", label: "Chunk" },
        { key: "vector", label: "Vector" },
        { key: "BM25", label: "BM25" },
        { key: "rrf", label: "RRF" },
        { key: "reranking", label: "Reranking" }
    ];



    return (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">

            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Retrieval Scores
            </h3>

            <div className="flex items-center gap-2">
                <label className="text-xs text-zinc-500 dark:text-zinc-400">
                    Sort By
                </label>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="
                        px-2 py-1
                        text-xs
                        rounded-md
                        border
                        border-zinc-300
                        dark:border-zinc-600
                        bg-white
                        dark:bg-zinc-800
                        text-zinc-900
                        dark:text-zinc-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                >
                    <option value="reranking">Reranking</option>
                    <option value="rrf">RRF</option>
                    <option value="vector">Vector</option>
                    <option value="BM25">BM25</option>
                    <option value="chunkId">Chunk ID</option>
                </select>
            </div>

        </div>

        {/* Table */}
        <div className="overflow-auto max-h-125">

            <table className="w-full text-xs">

                <thead className="sticky top-0 z-10">

                    <tr className="
                        bg-zinc-100
                        dark:bg-zinc-800
                        border-b
                        border-zinc-200
                        dark:border-zinc-700
                    ">
                        {columns.map(col => (

                            <th className ={ `
                            px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-300
                            ${sortBy === col.key
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "text-zinc-400"}`}>
                                {col.label}

                                {sortBy === col.key && (
                                    <span className="ml-1 dark:text-emerald-300 text-emerald-700">
                                        ↓
                                    </span>
                                )}


                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {tableData.map((row) => (

                        
                        <tr
                            key={row.chunkId}
                            className="
                                border-b
                                border-zinc-100
                                dark:border-zinc-800
                                hover:bg-zinc-50
                                dark:hover:bg-zinc-800/50
                                transition-colors
                            "
                        >

                            {columns.map(col => (
                                <td className={`
                                        px-3 py-2 font-mono transition-colors
                                        ${
                                            sortBy === col.key
                                                ? "bg-emerald-500/5 dark:text-emerald-300 text-emerald-700"
                                                : "text-zinc-300"
                                        }
                                    `}>
                                    {col.key === "chunkId"
                                        ? row.chunkId
                                        : formatScore(row[col.key])}
                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    </div>
);
}