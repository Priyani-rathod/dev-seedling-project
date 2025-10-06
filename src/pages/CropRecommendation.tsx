import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CropRecommendation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    season: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Processing Request",
      description: "AI is analyzing soil data for crop recommendations...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-secondary-foreground/90 hover:text-secondary-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-2">Crop Recommendation</h1>
          <p className="text-secondary-foreground/90">Get AI-powered crop suggestions based on soil data</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Soil & Climate Data</CardTitle>
            <CardDescription>Enter your farm's soil test results and local conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (N) mg/kg</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="40"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (P) mg/kg</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="50"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (K) mg/kg</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="20"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ph">Soil pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    placeholder="6.5"
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="25"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="65"
                    value={formData.humidity}
                    onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall">Rainfall (mm)</Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="100"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
                    <SelectTrigger id="season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                      <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                      <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base">
                <Leaf className="mr-2 h-5 w-5" />
                Get Crop Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-secondary/5 border-secondary/30">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Don't have soil test results? You can:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact your local agricultural office</li>
              <li>Use our estimated values based on location</li>
              <li>Get a soil testing kit from farming stores</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropRecommendation;
