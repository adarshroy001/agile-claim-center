
export type ClaimStatus = "pending" | "approved" | "rejected" | "inReview";

export interface Claim {
  claimId: string;
  title: string;
  description: string;
  status: ClaimStatus;
  clientName: string;
  assignedEmployee: string;
  dateFiled: string | Date;
  lastUpdated: string | Date;
  policyId: string;
  reportNo: string;
  insurer: string;
  insured: string;
  surveyor?: string;
}

export interface ClaimDocument {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  dateModified: string | Date;
  url: string;
  uploadedBy?: string;
}

export interface ClaimEvent {
  date: string | Date;
  title: string;
  description: string;
  user?: string;
}
