import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Cloud, Droplet, Wind, Sun, CloudRain, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Weather = () => {
  const forecast = [
    { day: "Mon", temp: 28, condition: "Sunny", icon: Sun },
    { day: "Tue", temp: 26, condition: "Cloudy", icon: Cloud },
    { day: "Wed", temp: 24, condition: "Rainy", icon: CloudRain },
    { day: "Thu", temp: 27, condition: "Sunny", icon: Sun },
    { day: "Fri", temp: 29, condition: "Sunny", icon: Sun },
    { day: "Sat", temp: 25, condition: "Cloudy", icon: Cloud },
    { day: "Sun", temp: 23, condition: "Rainy", icon: CloudRain },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-sky-blue to-sky-blue/70 text-sky-blue-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-sky-blue-foreground/80 hover:text-sky-blue-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-2">Weather Forecast</h1>
          <p className="text-sky-blue-foreground/80">Punjab, India</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Current Weather */}
        <Card className="bg-gradient-to-br from-sky-blue/20 to-sky-blue/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Cloud className="h-20 w-20 mx-auto text-sky-blue-foreground" />
              <div>
                <p className="text-6xl font-bold">28°C</p>
                <p className="text-xl text-muted-foreground">Partly Cloudy</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Droplet className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">65%</p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
                <div className="text-center">
                  <Wind className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">12 km/h</p>
                  <p className="text-xs text-muted-foreground">Wind</p>
                </div>
                <div className="text-center">
                  <CloudRain className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm font-medium">30%</p>
                  <p className="text-xs text-muted-foreground">Rain</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">7-Day Forecast</CardTitle>
            <CardDescription>Weather predictions for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <day.icon className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.condition}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{day.temp}°C</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent-foreground" />
              <CardTitle className="font-heading">Weather Alert</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Light to moderate rainfall expected on Wednesday. Consider postponing fertilizer application.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Farming Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Farming Advice */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Weather-Based Farming Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 bg-primary rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium">Ideal for Irrigation</p>
                <p className="text-muted-foreground">Current humidity levels are good for watering crops</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 bg-secondary rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium">Pest Activity</p>
                <p className="text-muted-foreground">Warm weather may increase pest activity. Monitor crops closely</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 bg-accent rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium">UV Index: Moderate</p>
                <p className="text-muted-foreground">Use sun protection when working in fields</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
