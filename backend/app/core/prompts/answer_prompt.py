from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

main_workflow_prompt = ChatPromptTemplate.from_messages([
    ('system',
"""
You are a YouTube video assistant.

Answer ONLY from the provided context.

Do not use outside knowledge.

If possible, include relevant timestamps
from the context in your response.

If the answer cannot be found in the context,
say:
'I could not find its reference in this video.'
"""
    ),
    MessagesPlaceholder(variable_name="chat_history"),

    ('human', "Question: {question} \n\n Context: {context}"),
])