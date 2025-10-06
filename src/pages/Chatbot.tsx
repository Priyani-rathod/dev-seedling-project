import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, Languages } from "lucide-react";
import { Link } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "नमस्ते! मैं आपकी खेती में कैसे मदद कर सकता हूं? / Hello! How can I help you with farming today?" }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"hindi" | "english">("english");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm here to help with your farming questions. This is a demo response. In production, this will connect to our AI assistant." 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg flex-shrink-0">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Link to="/dashboard" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLanguage(language === "hindi" ? "english" : "hindi")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === "hindi" ? "English" : "हिन्दी"}
            </Button>
          </div>
          <h1 className="font-heading text-xl font-bold">AI Farm Assistant</h1>
          <p className="text-sm text-primary-foreground/90">Ask me anything about farming</p>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="container max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[85%] p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="whitespace-nowrap"
              onClick={() => setInput("What crops grow best in my region?")}
            >
              Best Crops
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setInput("How do I control pests naturally?")}
            >
              Pest Control
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setInput("When should I water my crops?")}
            >
              Watering Tips
            </Button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur pb-safe">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={language === "hindi" ? "अपना सवाल पूछें..." : "Ask your question..."}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="flex-shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
