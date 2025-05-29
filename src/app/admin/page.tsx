import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ShoppingBag, Tag, Users, BarChart2 } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Sales", value: "₹1,250,860", change: "+12.5%", icon: BarChart2, color: "text-green-500" },
    { title: "New Orders", value: "350", change: "+5.2%", icon: ShoppingBag, color: "text-blue-500" },
    { title: "Pending Invoices", value: "15", change: "-2.1%", icon: FileText, color: "text-yellow-500" },
    { title: "Registered Users", value: "1,200", change: "+8%", icon: Users, color: "text-purple-500" },
  ];

  const quickActions = [
    { label: "Manage Invoices", href: "/admin/invoices", icon: FileText },
    { label: "Add New Product", href: "/admin/products/new", icon: ShoppingBag },
    { label: "View Categories", href: "/admin/categories", icon: Tag },
    { label: "User Management", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} dark:${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Quick Actions</CardTitle>
          <CardDescription>Easily access common administrative tasks.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" asChild className="flex items-center justify-start p-6 text-left h-auto hover:bg-accent/10">
              <Link href={action.href}>
                <action.icon className="h-6 w-6 mr-3 text-primary" />
                <span className="font-medium text-foreground">{action.label}</span>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Placeholder for recent activity or charts */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recent activity feed will be shown here.</p>
          {/* Example: List of recent orders, new user signups, etc. */}
        </CardContent>
      </Card>
    </div>
  );
}
