import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ExternalLink, Info } from "lucide-react";

interface ClinicalAnchor {
  term: string;
  definition: string;
  clinicalNotes: string;
  imciReference?: string;
  appSection?: string;
  sourceUrl?: string;
}

const clinicalAnchors: Record<string, ClinicalAnchor> = {
  "danger signs": {
    term: "IMCI Danger Signs",
    definition: "Signs indicating immediate life-threatening conditions requiring urgent care",
    clinicalNotes: "Not able to drink/breastfeed, vomits everything, has had convulsions, or is lethargic/unconscious",
    imciReference: "IMCI Chart Booklet 2019, Section 2",
    appSection: "/triage",
    sourceUrl: "https://www.who.int/publications/i/item/9789241506823"
  },
  "fast breathing": {
    term: "Fast Breathing",
    definition: "Respiratory rate above age-specific thresholds indicating pneumonia",
    clinicalNotes: "≥50 breaths/min (2-11 months) or ≥40 breaths/min (12-59 months). Count for full minute when child is calm.",
    imciReference: "IMCI Chart Booklet 2019, Pneumonia Assessment",
    appSection: "/consultation",
    sourceUrl: "https://www.who.int/publications/i/item/9789241506823"
  },
  "hypoxia": {
    term: "Hypoxia",
    definition: "Inadequate oxygen supply to tissues",
    clinicalNotes: "SpO₂ <90% indicates severe hypoxia requiring immediate oxygen therapy and referral",
    imciReference: "WHO Pocket Book 2013, Oxygen Therapy",
    appSection: "/triage",
    sourceUrl: "https://www.who.int/publications/i/item/978-92-4-151571-6"
  },
  "sam": {
    term: "Severe Acute Malnutrition (SAM)",
    definition: "Life-threatening condition due to severe nutritional deficiency",
    clinicalNotes: "MUAC <11.5cm, WHZ <-3 SD, or bilateral pitting edema. Requires therapeutic feeding.",
    imciReference: "WHO SAM Guidelines 2022",
    appSection: "/nutrition",
    sourceUrl: "https://www.who.int/publications/i/item/9789240025257"
  },
  "muac": {
    term: "Mid-Upper Arm Circumference (MUAC)",
    definition: "Anthropometric measurement for assessing nutritional status",
    clinicalNotes: "Measured at midpoint of left upper arm. <11.5cm indicates SAM in children 6-59 months.",
    imciReference: "WHO Growth Standards 2023",
    appSection: "/triage",
    sourceUrl: "https://www.who.int/tools/child-growth-standards"
  },
  "pneumonia treatment": {
    term: "Pneumonia Treatment",
    definition: "IMCI-based antibiotic therapy for childhood pneumonia",
    clinicalNotes: "Outpatient: Oral amoxicillin 25-50mg/kg BID × 5 days. Severe: IV ampicillin + gentamicin",
    imciReference: "IMCI Chart Booklet 2019, Treatment Tables",
    appSection: "/prescription",
    sourceUrl: "https://www.who.int/publications/i/item/9789241506823"
  },
  "ors": {
    term: "Oral Rehydration Solution (ORS)",
    definition: "WHO/UNICEF low-osmolarity ORS for diarrhea treatment",
    clinicalNotes: "Give 75ml/kg over 4 hours for some dehydration. Continue breastfeeding and give extra ORS for ongoing losses.",
    imciReference: "IMCI Diarrhea Treatment Protocol",
    appSection: "/prescription",
    sourceUrl: "https://www.who.int/publications/i/item/9789241506823"
  },
  "convulsions": {
    term: "Convulsions",
    definition: "Seizure activity - IMCI general danger sign",
    clinicalNotes: "Any seizure in past illness episode. Give rectal diazepam if available and refer immediately.",
    imciReference: "IMCI Chart Booklet 2019, Danger Signs",
    appSection: "/emergency",
    sourceUrl: "https://www.who.int/publications/i/item/9789241506823"
  }
};

interface ClinicalTooltipProps {
  children: ReactNode;
  anchor: string;
  className?: string;
}

export function ClinicalTooltip({ children, anchor, className }: ClinicalTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const clinicalData = clinicalAnchors[anchor.toLowerCase()];
  
  if (!clinicalData) {
    return <span className={className}>{children}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span 
            className={`cursor-help underline decoration-dotted decoration-primary text-primary hover:decoration-solid ${className}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4" side="top">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-primary">{clinicalData.term}</h4>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Definition:</p>
              <p className="text-sm text-muted-foreground">{clinicalData.definition}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Clinical Notes:</p>
              <p className="text-sm text-muted-foreground">{clinicalData.clinicalNotes}</p>
            </div>
            
            {clinicalData.imciReference && (
              <div>
                <p className="text-sm font-medium mb-1">IMCI Reference:</p>
                <p className="text-xs text-muted-foreground">{clinicalData.imciReference}</p>
              </div>
            )}
            
            <div className="flex gap-2 pt-2 border-t">
              {clinicalData.appSection && (
                <Button variant="outline" size="sm" asChild>
                  <a href={clinicalData.appSection}>
                    View in App
                  </a>
                </Button>
              )}
              {clinicalData.sourceUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={clinicalData.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Helper component for easy integration in text
interface ClinicalTermProps {
  children: ReactNode;
  anchor: string;
  className?: string;
}

export function ClinicalTerm({ children, anchor, className }: ClinicalTermProps) {
  return (
    <ClinicalTooltip anchor={anchor} className={className}>
      {children}
    </ClinicalTooltip>
  );
}

// Pre-built components for common clinical terms
export const DangerSigns = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="danger signs" {...props}>{children}</ClinicalTerm>
);

export const FastBreathing = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="fast breathing" {...props}>{children}</ClinicalTerm>
);

export const Hypoxia = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="hypoxia" {...props}>{children}</ClinicalTerm>
);

export const SAM = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="sam" {...props}>{children}</ClinicalTerm>
);

export const MUAC = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="muac" {...props}>{children}</ClinicalTerm>
);

export const ORS = ({ children, ...props }: Omit<ClinicalTermProps, 'anchor'>) => (
  <ClinicalTerm anchor="ors" {...props}>{children}</ClinicalTerm>
);