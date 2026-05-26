from langchain_core.messages import HumanMessage, AIMessage


# ---------------------------------------------------
# Final Answer Generator
# ---------------------------------------------------

def generate_answer(chain, question, context, chat_history):

    result = chain.invoke({
        "question": question,
        "context": context,
        "chat_history": chat_history
    })



    chat_history.append(HumanMessage(content=question))
    chat_history.append(AIMessage(content=result))

    # Keep only last 6 messages
    chat_history[:] = chat_history[-6:]

    return result
