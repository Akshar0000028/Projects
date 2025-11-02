import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings, ChatNVIDIA
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    try:
        # Using the reliable ai-embed-qa-4 embedding model
        embeddings = NVIDIAEmbeddings(model="ai-embed-qa-4")
        vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
        return vectorstore
    except Exception as e:
        st.error(f"Error creating vector store: {e}")
        st.stop()

def get_conversation_chain(vectorstore):
    try:
        # Using Mixtral 8x7b model for chat (good balance of quality and performance)
        llm = ChatNVIDIA(model="mixtral_8x7b", temperature=0.5)
        memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            memory=memory
        )
        return conversation_chain
    except Exception as e:
        st.error(f"Error creating conversation chain: {e}")
        st.stop()

def handle_userinput(user_question):
    try:
        response = st.session_state.conversation({'question': user_question})
        st.session_state.chat_history = response['chat_history']

        for i, message in enumerate(st.session_state.chat_history):
            if i % 2 == 0:
                with st.chat_message("user"):
                    st.write(message.content)
            else:
                with st.chat_message("assistant"):
                    st.write(message.content)
    except Exception as e:
        st.error(f"Error processing your question: {e}")

def main():
    st.set_page_config(page_title="Chat with multiple PDFs", page_icon=":books:")

    # Initialize session state
    if "conversation" not in st.session_state:
        st.session_state.conversation = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    st.header("Chat with multiple PDFs :books:")
    
    # Display chat messages from history on app rerun
    for message in st.session_state.chat_history:
        if hasattr(message, 'type') and message.type == "human":
            with st.chat_message("user"):
                st.write(message.content)
        else:
            with st.chat_message("assistant"):
                st.write(message.content)
    
    user_question = st.chat_input("Ask a question about your documents:")
    if user_question and st.session_state.conversation is not None:
        handle_userinput(user_question)

    with st.sidebar:
        st.subheader("Your documents")
        pdf_docs = st.file_uploader(
            "Upload your PDFs here and click on 'Process'", 
            accept_multiple_files=True, 
            type=["pdf"]
        )
        if st.button("Process") and pdf_docs:
            with st.spinner("Processing..."):
                try:
                    # Get pdf text
                    raw_text = get_pdf_text(pdf_docs)
                    
                    # Get the text chunks
                    text_chunks = get_text_chunks(raw_text)
                    
                    # Create vector store
                    vectorstore = get_vectorstore(text_chunks)
                    
                    # Create conversation chain
                    st.session_state.conversation = get_conversation_chain(vectorstore)
                    
                    st.success("Processing complete! You can now ask questions about your documents.")
                except Exception as e:
                    st.error(f"Error processing documents: {e}")
            
      

if __name__ == '__main__':
    main()