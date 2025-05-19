
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClaimsFilter from "@/components/claims/ClaimsFilter";
import ClaimsTable from "@/components/claims/ClaimsTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Grid2X2, List, Plus } from "lucide-react";
import ClaimCard from "@/components/claims/ClaimCard";
import { mockClaims } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Claim } from "@/types/claim";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ClaimsList = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>(mockClaims);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filters: any) => {
    let results = [...mockClaims];
    
    if (filters.policyNumber) {
      results = results.filter(claim => 
        claim.policyId.toLowerCase().includes(filters.policyNumber.toLowerCase())
      );
    }
    
    if (filters.customerName) {
      results = results.filter(claim => 
        claim.clientName.toLowerCase().includes(filters.customerName.toLowerCase())
      );
    }
    
    if (filters.employee) {
      results = results.filter(claim => 
        claim.assignedEmployee.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }
    
    if (filters.status) {
      results = results.filter(claim => claim.status === filters.status);
    }
    
    // Date filtering logic would go here
    
    setFilteredClaims(results);
    setCurrentPage(1);
  };

  const handleDeleteClaim = (claimId: string) => {
    toast({
      title: "Claim deleted",
      description: `Claim ${claimId} has been deleted successfully.`,
    });
    
    setFilteredClaims(prevClaims => 
      prevClaims.filter(claim => claim.claimId !== claimId)
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
          <Button asChild>
            <Link to="/claims/new">
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Link>
          </Button>
        </div>

        <ClaimsFilter onFilterChange={handleFilterChange} />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{paginatedClaims.length}</span> of{" "}
              <span className="font-medium">{filteredClaims.length}</span> claims
            </p>
          </div>
          <div className="flex space-x-2">
            <Tabs defaultValue="table" onValueChange={(value) => setViewMode(value as "grid" | "table")}>
              <TabsList>
                <TabsTrigger value="table">
                  <List className="h-4 w-4 mr-1" />
                  List
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <Grid2X2 className="h-4 w-4 mr-1" />
                  Grid
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="border rounded-lg bg-white overflow-hidden">
            <ClaimsTable 
              claims={paginatedClaims}
              onDeleteClaim={handleDeleteClaim} 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedClaims.map(claim => (
              <ClaimCard key={claim.claimId} claim={claim} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClaimsList;
