
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusChart from "@/components/dashboard/StatusChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import ClaimCard from "@/components/claims/ClaimCard";
import { Link } from "react-router-dom";
import { dashboardStats, mockClaims, statusChartData } from "@/data/mockData";

const Index = () => {
  // Recent claims (last 3)
  const recentClaims = mockClaims.sort((a, b) => {
    return new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime();
  }).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link to="/claims/new">
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Claims"
            value={dashboardStats.totalClaims}
            icon={<FileText className="h-5 w-5 text-primary" />}
            trend={{ value: dashboardStats.claimsTrend, positive: true }}
          />
          <StatCard
            title="Pending Claims"
            value={dashboardStats.pendingClaims}
            icon={<Clock className="h-5 w-5 text-status-pending" />}
          />
          <StatCard
            title="Approved Claims"
            value={dashboardStats.approvedClaims}
            icon={<CheckCircle className="h-5 w-5 text-status-approved" />}
          />
          <StatCard
            title="Rejected Claims"
            value={dashboardStats.rejectedClaims}
            icon={<XCircle className="h-5 w-5 text-status-rejected" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatusChart data={statusChartData} />
          
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Processing Time</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.averageProcessingDays} days
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average claim processing time
              </p>
              <div className="mt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                    </div>
                    <span className="text-xs">Auto</span>
                    <span className="text-xs text-muted-foreground">4.2 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "95%" }}></div>
                    </div>
                    <span className="text-xs">Home</span>
                    <span className="text-xs text-muted-foreground">5.7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <span className="text-xs">Medical</span>
                    <span className="text-xs text-muted-foreground">7.3 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Claims</h2>
            <Button variant="ghost" asChild>
              <Link to="/claims">View All Claims</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recentClaims.map(claim => (
              <ClaimCard key={claim.claimId} claim={claim} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
