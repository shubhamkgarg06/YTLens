from langchain_core.prompts import ChatPromptTemplate


timestamp_extraction_prompt = ChatPromptTemplate.from_messages([

    (
        "system",

        """
You are a timestamp extraction assistant.

Your task is to extract timestamp ranges
from user queries and convert them into seconds.

RULES:

1. Return ONLY:
start,end

2. Do NOT explain anything.

3. Do NOT return extra text.

4. If user mentions a single timestamp like:
"around 45 minutes"

then create a reasonable range around it.

Example:
44:00 → 46:00

which becomes:
2640,2760

5. If no timestamp exists, return:
NONE

EXAMPLES:

Query:
Explain section from 2:30 to 2:45

Output:
150,165

Query:
What happens around 45 minutes?

Output:
2640,2760

Query:
What is Python?

Output:
NONE
"""
    ),

    (
        "human",

        """
Query:
{query}
"""
    )
])