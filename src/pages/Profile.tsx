import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, Bell, Globe, Moon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="container max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-4 text-primary-foreground/90 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary-foreground text-primary text-xl font-bold">
                FK
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-heading text-2xl font-bold">Farmer Profile</h1>
              <p className="text-primary-foreground/90">Manage your account settings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle className="font-heading">Personal Information</CardTitle>
            </div>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Farmer Kumar" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location / Village</Label>
              <Input id="location" defaultValue="Punjab" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Input id="farmSize" type="number" defaultValue="5" />
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle className="font-heading">Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weather-alerts">Weather Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notifications about weather changes</p>
              </div>
              <Switch id="weather-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="crop-reminders">Crop Care Reminders</Label>
                <p className="text-sm text-muted-foreground">Seasonal farming tips and reminders</p>
              </div>
              <Switch id="crop-reminders" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="community-updates">Community Updates</Label>
                <p className="text-sm text-muted-foreground">New posts and comments</p>
              </div>
              <Switch id="community-updates" />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">English</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                </div>
              </div>
              <Switch id="dark-mode" />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-destructive/30">
          <CardContent className="pt-6 space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground">
              Export My Data
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
