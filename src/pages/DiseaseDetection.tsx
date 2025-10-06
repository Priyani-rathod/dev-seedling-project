import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis Started",
      description: "AI is analyzing your crop image...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-primary-foreground/90 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-2">Disease Detection</h1>
          <p className="text-primary-foreground/90">Upload or capture crop images for AI analysis</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Upload Crop Image</CardTitle>
            <CardDescription>Take a clear photo of the affected crop area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected crop" 
                  className="w-full rounded-lg object-cover max-h-80"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAnalyze}
                    className="flex-1"
                  >
                    Analyze Image
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedImage(null)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                    <Camera className="h-10 w-10 text-primary" />
                    <span className="font-medium text-sm text-center">Take Photo</span>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-secondary/30 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-colors">
                    <Upload className="h-10 w-10 text-secondary" />
                    <span className="font-medium text-sm text-center">Choose from Gallery</span>
                  </div>
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-accent/5 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent-foreground" />
              <CardTitle className="font-heading text-lg">Tips for Best Results</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Take photos in good natural lighting</li>
              <li>• Focus on the affected area clearly</li>
              <li>• Include close-up shots of symptoms</li>
              <li>• Avoid blurry or dark images</li>
              <li>• Multiple angles help diagnosis</li>
            </ul>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Recent Scans</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-muted-foreground py-8">
                No recent scans. Upload your first image to get started!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
