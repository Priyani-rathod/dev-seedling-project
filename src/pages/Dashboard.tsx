import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Leaf, FlaskConical, Cloud, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <h1 className="font-heading text-2xl font-bold mb-2">Welcome, Farmer!</h1>
          <p className="text-primary-foreground/90">Your farm management dashboard</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Weather Widget */}
        <Card className="bg-gradient-to-br from-sky-blue/20 to-sky-blue/5 border-sky-blue/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="h-6 w-6 text-sky-blue-foreground" />
                <CardTitle className="font-heading">Today's Weather</CardTitle>
              </div>
              <Link to="/weather">
                <Button variant="ghost" size="sm">View Details</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">28°C</p>
                <p className="text-muted-foreground">Partly Cloudy</p>
              </div>
              <div className="text-right text-sm">
                <p>Humidity: 65%</p>
                <p>Wind: 12 km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/disease-detection" className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border-2 border-transparent hover:border-primary transition-all active:scale-95">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Sprout className="h-7 w-7 text-primary" />
              </div>
              <span className="text-xs font-medium text-center">Disease Check</span>
            </Link>

            <Link to="/crop-recommendation" className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border-2 border-transparent hover:border-secondary transition-all active:scale-95">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center">
                <Leaf className="h-7 w-7 text-secondary" />
              </div>
              <span className="text-xs font-medium text-center">Crop Guide</span>
            </Link>

            <Link to="/fertilizer-recommendation" className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border-2 border-transparent hover:border-accent transition-all active:scale-95">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <FlaskConical className="h-7 w-7 text-accent-foreground" />
              </div>
              <span className="text-xs font-medium text-center">Fertilizer</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Tomato Leaf Analyzed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Wheat Recommendation</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>

              <Link to="/history">
                <Button variant="outline" className="w-full mt-2">View All History</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Crops Analyzed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Days Active</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seasonal Tips */}
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Seasonal Farming Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the perfect time to prepare your soil for the upcoming season. Consider adding organic compost to improve soil health.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
