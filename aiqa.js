import { OpenAIEmbeddings } from "langchain/embeddings";
import { Chroma } from "langchain/vectorstores";
import { TokenTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms";
import { ChatVectorDBQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders";
import { ChromaClient } from 'chromadb';

class AIQA {
  #loader;
  #docs;
  #textSplitter;
  #pdf;
  #embeddings;
  #vectorDB;

  #qa;

  constructor(KEY, CHUNK_SIZE, doc) {
    return (async () => {
      this.#loader = new PDFLoader(doc);
      this.#docs = await this.#loader.load();
      this.#textSplitter = new TokenTextSplitter({
        chunkSize: CHUNK_SIZE,
        chunkOverlap: 0,
      });
      this.#pdf = await this.#textSplitter.splitDocuments(this.#docs);
      this.#embeddings = new OpenAIEmbeddings({openAIApiKey: KEY});
      this.#vectorDB = await Chroma.fromDocuments(this.#pdf, this.#embeddings, {});
      this.#qa = ChatVectorDBQAChain.fromLLM(new OpenAI({openAIApiKey: KEY, temperature:0, modelName:"gpt-3.5-turbo"}), this.#vectorDB, {returnSourceDocuments:true});
      return this;
    })();
  }
  query(q,h) {
    return (async () => {
      let result =  await this.#qa.call({"question": q, "chat_history":h});
      result.text = result.text.trim();
      return result;
    })();
  }
}
export default AIQA;
