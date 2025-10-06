import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FertilizerRecommendation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cropType: "",
    cropStage: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    farmArea: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Processing Request",
      description: "Calculating optimal fertilizer recommendations...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-accent text-accent-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-accent-foreground/80 hover:text-accent-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-2">Fertilizer Recommendation</h1>
          <p className="text-accent-foreground/80">Get precise fertilizer advice for your crops</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Crop & Soil Information</CardTitle>
            <CardDescription>Enter crop details and current soil nutrient levels</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={formData.cropType} onValueChange={(value) => setFormData({ ...formData, cropType: value })}>
                  <SelectTrigger id="cropType">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropStage">Crop Growth Stage</Label>
                <Select value={formData.cropStage} onValueChange={(value) => setFormData({ ...formData, cropStage: value })}>
                  <SelectTrigger id="cropStage">
                    <SelectValue placeholder="Select growth stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seedling">Seedling</SelectItem>
                    <SelectItem value="vegetative">Vegetative</SelectItem>
                    <SelectItem value="flowering">Flowering</SelectItem>
                    <SelectItem value="fruiting">Fruiting</SelectItem>
                    <SelectItem value="maturity">Maturity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen-fert">Nitrogen (N)</Label>
                  <Input
                    id="nitrogen-fert"
                    type="number"
                    placeholder="40"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phosphorus-fert">Phosphorus (P)</Label>
                  <Input
                    id="phosphorus-fert"
                    type="number"
                    placeholder="50"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="potassium-fert">Potassium (K)</Label>
                  <Input
                    id="potassium-fert"
                    type="number"
                    placeholder="20"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmArea">Farm Area (acres)</Label>
                <Input
                  id="farmArea"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={formData.farmArea}
                  onChange={(e) => setFormData({ ...formData, farmArea: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base">
                <FlaskConical className="mr-2 h-5 w-5" />
                Get Fertilizer Plan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="bg-accent/5 border-accent/30">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Why Precise Fertilization?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="space-y-2">
              <li>✓ Optimize crop yield and quality</li>
              <li>✓ Reduce fertilizer costs by 20-30%</li>
              <li>✓ Minimize environmental impact</li>
              <li>✓ Improve soil health over time</li>
              <li>✓ Get customized application schedules</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
