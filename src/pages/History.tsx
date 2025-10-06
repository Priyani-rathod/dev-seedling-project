import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Sprout, Leaf, FlaskConical, Download } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const diseaseHistory = [
    { id: 1, crop: "Tomato", result: "Early Blight Detected", date: "2 hours ago", confidence: 92 },
    { id: 2, crop: "Wheat", result: "Healthy", date: "Yesterday", confidence: 98 },
    { id: 3, crop: "Rice", result: "Blast Disease", date: "3 days ago", confidence: 85 },
  ];

  const cropHistory = [
    { id: 1, recommendation: "Wheat, Rice, Maize", season: "Rabi", date: "Yesterday" },
    { id: 2, recommendation: "Cotton, Sugarcane", season: "Kharif", date: "5 days ago" },
  ];

  const fertilizerHistory = [
    { id: 1, crop: "Rice", fertilizer: "NPK 10-26-26", quantity: "50 kg", date: "2 days ago" },
    { id: 2, crop: "Wheat", fertilizer: "Urea", quantity: "30 kg", date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-primary-foreground/90 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold mb-2">History & Analytics</h1>
              <p className="text-primary-foreground/90">Track your farming decisions</p>
            </div>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="diseases" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diseases">Diseases</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          </TabsList>

          <TabsContent value="diseases" className="space-y-3">
            {diseaseHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sprout className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading font-semibold">{item.crop}</h3>
                          <p className="text-sm text-muted-foreground">{item.result}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <p className="text-xs font-medium text-primary">{item.confidence}% match</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="crops" className="space-y-3">
            {cropHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading font-semibold">{item.recommendation}</h3>
                          <p className="text-sm text-muted-foreground">{item.season} Season</p>
                        </div>
                        <p className="text-xs text-muted-foreground flex-shrink-0">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="fertilizers" className="space-y-3">
            {fertilizerHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading font-semibold">{item.crop}</h3>
                          <p className="text-sm text-muted-foreground">{item.fertilizer} - {item.quantity}</p>
                        </div>
                        <p className="text-xs text-muted-foreground flex-shrink-0">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
