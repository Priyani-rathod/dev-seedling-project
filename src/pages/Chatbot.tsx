import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, Languages, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "नमस्ते! मैं आपकी खेती में कैसे मदद कर सकता हूं? / Hello! How can I help you with farming today?" }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"hindi" | "english">("english");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending message to chatbot...");
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ]
        }
      });

      console.log("Response from chatbot:", data, error);

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      const assistantMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: assistantMessage 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI assistant.",
        variant: "destructive",
      });
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-muted/20 to-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground p-5 shadow-xl flex-shrink-0 border-b border-primary-foreground/10">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-3 py-1.5 backdrop-blur-sm">
              <Globe className="h-4 w-4" />
              <Select value={language} onValueChange={(value: "hindi" | "english") => setLanguage(value)}>
                <SelectTrigger className="border-0 bg-transparent text-primary-foreground font-medium h-auto p-0 focus:ring-0 w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-tight">AI Farm Assistant</h1>
            <p className="text-sm text-primary-foreground/80 font-medium">
              {language === "hindi" ? "खेती के बारे में मुझसे कुछ भी पूछें" : "Ask me anything about farming"}
            </p>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-5 pb-32">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <Card
                className={`max-w-[85%] p-5 shadow-md ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                    : "bg-card border-2 rounded-2xl rounded-bl-md"
                }`}
              >
                <p className="text-base leading-relaxed font-body whitespace-pre-wrap">{message.content}</p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <Card className="max-w-[85%] p-5 bg-card border-2 rounded-2xl rounded-bl-md shadow-md">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {language === "hindi" ? "टाइप कर रहा है..." : "Typing..."}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="fixed bottom-24 left-0 right-0 border-t bg-background/95 backdrop-blur-lg z-10 shadow-lg">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            {language === "hindi" ? "सुझाव" : "Quick Suggestions"}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button 
              variant="outline" 
              size="sm" 
              className="whitespace-nowrap font-medium hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              onClick={() => setInput(language === "hindi" ? "मेरे क्षेत्र में कौन सी फसलें सबसे अच्छी होती हैं?" : "What crops grow best in my region?")}
            >
              {language === "hindi" ? "सर्वोत्तम फसलें" : "Best Crops"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap font-medium hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              onClick={() => setInput(language === "hindi" ? "मैं कीटों को प्राकृतिक रूप से कैसे नियंत्रित करूं?" : "How do I control pests naturally?")}
            >
              {language === "hindi" ? "कीट नियंत्रण" : "Pest Control"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap font-medium hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              onClick={() => setInput(language === "hindi" ? "मुझे अपनी फसलों को कब पानी देना चाहिए?" : "When should I water my crops?")}
            >
              {language === "hindi" ? "पानी देने की युक्तियाँ" : "Watering Tips"}
            </Button>
          </div>
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 bg-background/95 backdrop-blur-lg shadow-2xl z-20 pb-16">
        <div className="container max-w-4xl mx-auto px-4 py-5">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder={language === "hindi" ? "अपना सवाल पूछें..." : "Ask your question..."}
              className="flex-1 text-base font-body shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
