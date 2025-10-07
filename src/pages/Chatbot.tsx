import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Send, Mic, Languages, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("https://api.openai.com/v1/chat/completions");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load saved API settings
  useEffect(() => {
    const savedKey = localStorage.getItem("chatbot_api_key");
    const savedEndpoint = localStorage.getItem("chatbot_api_endpoint");
    if (savedKey) setApiKey(savedKey);
    if (savedEndpoint) setApiEndpoint(savedEndpoint);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("chatbot_api_key", apiKey);
    localStorage.setItem("chatbot_api_endpoint", apiEndpoint);
    setIsSettingsOpen(false);
    toast({
      title: "Settings saved",
      description: "API configuration has been updated",
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your API key in settings",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful agricultural assistant. Provide farming advice in a clear and friendly manner." },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: assistantMessage 
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please check your API settings.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    }
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
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === "hindi" ? "english" : "hindi")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === "hindi" ? "English" : "हिन्दी"}
              </Button>
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>API Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="sk-..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input
                        id="api-endpoint"
                        placeholder="https://api.openai.com/v1/chat/completions"
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                      />
                    </div>
                    <Button onClick={saveSettings} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
