import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ThumbsUp, MessageCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const posts = [
    {
      id: 1,
      author: "Rajesh Kumar",
      location: "Punjab",
      avatar: "RK",
      content: "Successfully harvested 50 quintals of wheat per acre using the recommended fertilizer schedule from Fasal Sarthi!",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      author: "Priya Sharma",
      location: "Maharashtra",
      avatar: "PS",
      content: "The disease detection feature helped me identify early blight in my tomatoes. Saved my entire crop with early treatment!",
      likes: 18,
      comments: 5,
      timeAgo: "5 hours ago"
    },
    {
      id: 3,
      author: "Amit Patel",
      location: "Gujarat",
      avatar: "AP",
      content: "Looking for advice on cotton farming in the current season. Any experienced farmers here?",
      likes: 12,
      comments: 15,
      timeAgo: "1 day ago"
    }
  ];

  const tips = [
    { title: "Best time to sow wheat in North India", author: "Dr. Singh", reads: 245 },
    { title: "Organic pest control methods", author: "Sunita Devi", reads: 189 },
    { title: "Water conservation techniques", author: "Ramesh Yadav", reads: 167 }
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
          <h1 className="font-heading text-2xl font-bold mb-2">Farming Community</h1>
          <p className="text-primary-foreground/90">Connect and learn from fellow farmers</p>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Trending Tips */}
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
              <CardTitle className="font-heading">Trending Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start justify-between gap-3 p-3 bg-background/60 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground">by {tip.author}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{tip.reads} reads</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Posts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Community Feed</h2>
            <Button variant="outline" size="sm">New Post</Button>
          </div>

          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold">{post.author}</h3>
                    <p className="text-xs text-muted-foreground">{post.location} • {post.timeAgo}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Government Schemes */}
        <Card className="bg-secondary/5 border-secondary/30">
          <CardHeader>
            <CardTitle className="font-heading">Government Schemes</CardTitle>
            <CardDescription>Stay updated with latest farming schemes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="p-3 bg-background/60 rounded-lg">
              <h4 className="font-medium">PM-KISAN Scheme</h4>
              <p className="text-xs text-muted-foreground">Direct income support to farmers</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg">
              <h4 className="font-medium">Soil Health Card Scheme</h4>
              <p className="text-xs text-muted-foreground">Free soil testing for better yields</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
