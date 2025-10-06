import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sprout, FlaskConical, Cloud, Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="font-heading text-xl font-bold text-primary">Fasal Sarthi</h1>
          </div>
          <Button variant="outline" size="sm">Login</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Your Smart Farming Assistant
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            AI-powered crop disease detection, intelligent recommendations, and real-time agricultural guidance for farmers
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="container px-4 py-12">
        <h3 className="font-heading text-2xl font-bold text-center mb-8">Core Services</h3>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary hover:scale-[1.02]">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-heading">Disease Detection</CardTitle>
              <CardDescription>
                Upload crop photos for instant AI-powered disease identification and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-11" variant="outline">
                Analyze Crop
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-secondary hover:scale-[1.02]">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="font-heading">Crop Recommendation</CardTitle>
              <CardDescription>
                Get smart crop suggestions based on soil data, weather, and market trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-11" variant="outline">
                Get Recommendations
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-accent hover:scale-[1.02]">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <FlaskConical className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="font-heading">Fertilizer Advice</CardTitle>
              <CardDescription>
                Receive precise fertilizer recommendations and application schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-11" variant="outline">
                Get Fertilizer Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container px-4 py-12 my-12">
        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="font-heading text-2xl font-bold text-center mb-8">More Features</h3>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-sky-blue/20 rounded-full flex items-center justify-center">
                <Cloud className="h-7 w-7 text-sky-blue-foreground" />
              </div>
              <h4 className="font-heading font-semibold text-lg">Weather Updates</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Real-time weather forecasts and farming alerts</p>
            </div>
            
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-sky-blue/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-7 w-7 text-sky-blue-foreground" />
              </div>
              <h4 className="font-heading font-semibold text-lg">AI Chatbot</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">24/7 agricultural guidance in your language</p>
            </div>
            
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-sky-blue/20 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-sky-blue-foreground" />
              </div>
              <h4 className="font-heading font-semibold text-lg">Community</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Connect with farmers and share insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-heading font-semibold">Fasal Sarthi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Fasal Sarthi. Empowering farmers with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
