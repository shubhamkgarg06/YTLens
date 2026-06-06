import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import useChatblockMessages from "../../../context/ChatblockMessagesContext";
import useVideo from "../../../context/VideoContext";

import { API_URL } from "./config";


function OriginalQuerySelector({ setQueryData }) {
  const { queries } = useChatblockMessages();
  const { videoID } = useVideo();

  const [selectedQuery, setSelectedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Keep selected query in sync with available queries
  useEffect(() => {
    if (queries.length > 0) {
      setSelectedQuery(queries[queries.length - 1]);
    } else {
      setSelectedQuery("");
    }
  }, [queries]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchData = async (id) => {
    try {
      const res = await fetch(
        `{API_URL}/developer_mode_data/${videoID}/${id}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch query data");
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching query details:", error);
      return null;
    }
  };

  // Fetch query details whenever selected query changes
  useEffect(() => {
    if (!selectedQuery || !videoID) return;

    const loadData = async () => {
      const data = await fetchData(selectedQuery.id);

      if (data) {
        setQueryData(data);
      }
    };

    loadData();
  }, [selectedQuery, videoID]);

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-700 dark:text-gray-300">
        Original Query
      </p>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          disabled={queries.length === 0}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            w-full
            px-2
            py-1.5
            rounded-lg
            border
            border-gray-300
            dark:border-gray-700
            dark:bg-gray-800
            bg-white
            text-left
            text-xs
            flex
            justify-between
            items-center
            hover:border-blue-500
            transition-colors
          "
        >
          <span className="truncate pr-2">
            {queries.length === 0
              ? "No Queries Yet"
              : selectedQuery?.content}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && queries.length > 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              z-50
              mt-1
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              shadow-xl
              max-h-20
              overflow-y-auto
            "
          >
            {queries.map((query) => (
              <div
                key={query.id}
                onClick={() => {
                  setSelectedQuery(query);
                  setIsOpen(false);
                }}
                className={`
                  p-1
                  text-xs
                  cursor-pointer
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                  transition-colors
                  ${
                    selectedQuery?.id === query.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                      : ""
                  }
                `}
              >
                {query.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OriginalQuerySelector;
