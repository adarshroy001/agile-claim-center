
import { CalendarIcon, UserIcon, ClockIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/lib/date-utils";
import { Claim } from "@/types/claim";

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard = ({ claim }: ClaimCardProps) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">#{claim.claimId}</p>
          <StatusBadge status={claim.status} />
        </div>
        <Link to={`/claims/${claim.claimId}`}>
          <h3 className="font-semibold hover:text-primary transition-colors text-lg truncate">{claim.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <div className="flex items-center space-x-2 text-sm">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{claim.clientName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Filed: {formatDate(claim.dateFiled)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="flex items-center justify-between w-full text-xs">
          <p className="text-muted-foreground">
            <span>Assigned to: {claim.assignedEmployee}</span>
          </p>
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Updated: {formatDate(claim.lastUpdated)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
