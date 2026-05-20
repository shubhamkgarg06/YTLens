from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


query_reformulation_prompt = ChatPromptTemplate.from_messages([

    (
        "system",

        """
        You are a query reformulation assistant.

        Your job is to convert conversational user questions
        into standalone questions for semantic retrieval.

        If the current question depends on previous chat history,
        rewrite it into a complete standalone question.

        If the current question is already standalone,
        return it unchanged.

        Only return the reformulated question.
        """
    ),

    MessagesPlaceholder(variable_name="chat_history"),

    (
        "human",

        """
        Current Question:
        {question}
        """
    )
])