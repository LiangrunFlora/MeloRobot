import ReactMarkdown from "react-markdown";

interface Input {
  messages: string;
}

const MessageRenderer = ({ messages }: Input) => {
  return <ReactMarkdown>{messages}</ReactMarkdown>;
};

export default MessageRenderer;
