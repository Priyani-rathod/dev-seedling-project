import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import chatbotBackground from "@/assets/chatbot-background.jpg";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"hindi" | "english" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = (selectedLanguage: "hindi" | "english") => {
    setLanguage(selectedLanguage);
    const greeting = selectedLanguage === "hindi" 
      ? "नमस्ते! आपने हिंदी चुनी है। मैं आपका 'फसल सारथी' हूँ — आपकी खेती से जुड़ी हर ज़रूरत में मदद करने के लिए तैयार हूँ। आप मुझसे कुछ भी पूछ सकते हैं!" 
      : "Hello! You've selected English. I'm your 'Fasal Sarthi' — ready to help with all your farming needs. Ask me anything!";
    setMessages([{ role: "assistant", content: greeting }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !language) return;
    
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
          ],
          language
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
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (!language) {
    return (
      <div 
        className="flex flex-col items-center justify-center h-screen px-4 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 139, 34, 0.8), rgba(46, 125, 50, 0.9)), url(${chatbotBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-md w-full text-center space-y-8 bg-white/98 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-primary/10">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-black font-chatbot">
              Fasal Sarthi
            </h1>
            <h2 className="text-2xl font-bold text-black font-chatbot">
              फसल सारथी
            </h2>
            <p className="text-gray-800 text-lg font-medium font-chatbot">
              Your Smart Farming Assistant
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-black font-semibold font-chatbot">
              Please select your preferred language:
            </p>
            <p className="text-sm text-black font-semibold font-chatbot">
              कृपया अपनी पसंदीदा भाषा चुनें:
            </p>
            
            <div className="flex flex-col gap-4 mt-6">
              <Button
                onClick={() => handleLanguageSelect("english")}
                size="lg"
                className="text-lg font-bold h-16 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary-dark font-chatbot"
              >
                English
              </Button>
              <Button
                onClick={() => handleLanguageSelect("hindi")}
                size="lg"
                className="text-lg font-bold h-16 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary-dark font-chatbot"
              >
                हिंदी (Hindi)
              </Button>
            </div>
          </div>
          
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-black hover:text-primary transition-colors mt-6 font-medium font-chatbot">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col h-screen pb-20 relative font-chatbot" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.98)), url(${chatbotBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-5 shadow-lg flex-shrink-0">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold font-chatbot">Fasal Sarthi</h1>
              <p className="text-xs text-primary-foreground/90 font-chatbot">
                {language === "hindi" ? "आपका स्मार्ट कृषि सहायक" : "Your Smart Farming Assistant"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(null)}
              className="text-primary-foreground hover:bg-primary-foreground/20 font-chatbot font-semibold"
            >
              {language === "hindi" ? "भाषा बदलें" : "Change"}
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-transparent">
        <div className="container max-w-4xl mx-auto px-4 py-6 space-y-4 pb-48">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <Card
                className={`max-w-[85%] p-4 shadow-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-br-sm"
                    : "bg-white border-2 border-primary/20 rounded-2xl rounded-bl-sm text-black"
                }`}
              >
                <p className="text-base leading-relaxed whitespace-pre-wrap font-chatbot">
                  {message.content}
                </p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <Card className="max-w-[85%] p-4 bg-white border-2 border-primary/20 rounded-2xl rounded-bl-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 font-chatbot">
                    {language === "hindi" ? "टाइप कर रहा है..." : "Typing..."}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Quick Suggestions */}
      {messages.length > 0 && (
        <div className="fixed bottom-32 left-0 right-0 border-t bg-white/98 backdrop-blur-md z-10 shadow-md">
          <div className="container max-w-4xl mx-auto px-4 py-3 font-chatbot">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap text-xs hover:bg-primary hover:text-primary-foreground transition-all border-primary/30 font-chatbot font-semibold"
                onClick={() => setInput(language === "hindi" ? "मेरे क्षेत्र में कौन सी फसलें सबसे अच्छी होती हैं?" : "What crops grow best in my region?")}
              >
                {language === "hindi" ? "सर्वोत्तम फसलें" : "Best Crops"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap text-xs hover:bg-primary hover:text-primary-foreground transition-all border-primary/30 font-chatbot font-semibold"
                onClick={() => setInput(language === "hindi" ? "मैं कीटों को प्राकृतिक रूप से कैसे नियंत्रित करूं?" : "How do I control pests naturally?")}
              >
                {language === "hindi" ? "कीट नियंत्रण" : "Pest Control"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap text-xs hover:bg-primary hover:text-primary-foreground transition-all border-primary/30 font-chatbot font-semibold"
                onClick={() => setInput(language === "hindi" ? "मुझे अपनी फसलों को कब पानी देना चाहिए?" : "When should I water my crops?")}
              >
                {language === "hindi" ? "पानी देने की युक्तियाँ" : "Watering Tips"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white/98 backdrop-blur-md shadow-xl z-20 pb-20">
        <div className="container max-w-4xl mx-auto px-4 py-4 font-chatbot">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder={language === "hindi" ? "अपना सवाल पूछें..." : "Ask your question..."}
              className="flex-1 text-base rounded-2xl border-2 border-primary/20 focus:border-primary font-chatbot"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="flex-shrink-0 rounded-2xl h-12 w-12 bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
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
