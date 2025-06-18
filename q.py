# test_nvidia_llm.py

from langchain_nvidia_ai_endpoints import ChatNVIDIA
import os

# Set your NVIDIA API Key (if not using dotenv)
os.environ["NVIDIA_API_KEY"] = "NVIDIA_API_KEY"  # Replace this with your real key

# Try a known available model
try:
    llm = ChatNVIDIA(model="ai-embed-qa-4", temperature=0.5)
    response = llm.invoke("What is LangChain?")
    print("LLM Response:\n", response)
except Exception as e:
    print("Error:", e)
