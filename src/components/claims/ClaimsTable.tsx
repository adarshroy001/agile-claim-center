
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Claim } from "@/types/claim";

interface ClaimsTableProps {
  claims: Claim[];
  onDeleteClaim?: (id: string) => void;
}

const ClaimsTable = ({ claims, onDeleteClaim }: ClaimsTableProps) => {
  const [sortField, setSortField] = useState<keyof Claim>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Claim) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClaims = [...claims].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("clientName")}>
              Client
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("dateFiled")}>
              Date Filed
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastUpdated")}>
              Last Updated
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedClaims.map((claim) => (
          <TableRow key={claim.claimId}>
            <TableCell className="font-mono text-xs">#{claim.claimId}</TableCell>
            <TableCell className="font-medium">{claim.title}</TableCell>
            <TableCell><StatusBadge status={claim.status} /></TableCell>
            <TableCell>{claim.clientName}</TableCell>
            <TableCell>{claim.assignedEmployee}</TableCell>
            <TableCell>{formatDate(claim.dateFiled)}</TableCell>
            <TableCell>{formatDate(claim.lastUpdated)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/claims/${claim.claimId}`} className="flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/claims/edit/${claim.claimId}`} className="flex items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDeleteClaim && onDeleteClaim(claim.claimId)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClaimsTable;
