import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Thermometer, Stethoscope, Droplets, Zap, Baby, AlertTriangle, Search } from "lucide-react";

const symptomData = [
  {
    symptom: "Fever",
    icon: <Thermometer className="h-5 w-5" />,
    imciClassification: "Fever in absence of general danger signs",
    icd10: "R50.9",
    diagnosis: "Unspecified fever",
    treatment: "Assess for malaria, give paracetamol",
    severity: "mild",
    details: "Temperature ≥37.5°C. Check for malaria if endemic area. Assess for other bacterial infections."
  },
  {
    symptom: "Fast Breathing",
    icon: <Stethoscope className="h-5 w-5" />,
    imciClassification: "Fast breathing pneumonia",
    icd10: "J18.9",
    diagnosis: "Pneumonia, unspecified",
    treatment: "Oral amoxicillin 25-50mg/kg BID × 5 days",
    severity: "moderate",
    details: "≥50/min (2-11mo) or ≥40/min (12-59mo). No danger signs. Outpatient treatment."
  },
  {
    symptom: "Diarrhea",
    icon: <Droplets className="h-5 w-5" />,
    imciClassification: "Diarrhea with dehydration",
    icd10: "A09",
    diagnosis: "Infectious diarrhea",
    treatment: "ORS, zinc supplementation",
    severity: "moderate",
    details: "≥3 loose stools/day. Assess dehydration status. Give zinc 10-20mg/day × 10-14 days."
  },
  {
    symptom: "Convulsions",
    icon: <Zap className="h-5 w-5" />,
    imciClassification: "General danger sign",
    icd10: "R56.9",
    diagnosis: "Unspecified convulsions",
    treatment: "Immediate referral, rectal diazepam if available",
    severity: "critical",
    details: "Any seizure activity. Immediate danger sign requiring emergency care and referral."
  },
  {
    symptom: "Poor Feeding",
    icon: <Baby className="h-5 w-5" />,
    imciClassification: "General danger sign",
    icd10: "P92.9",
    diagnosis: "Feeding problem, unspecified",
    treatment: "Assess for serious bacterial infection",
    severity: "critical",
    details: "Unable to drink or breastfeed. Danger sign in young infants requiring immediate assessment."
  },
  {
    symptom: "Lethargy",
    icon: <AlertTriangle className="h-5 w-5" />,
    imciClassification: "General danger sign",
    icd10: "R53",
    diagnosis: "Malaise and fatigue",
    treatment: "Immediate assessment and referral",
    severity: "critical",
    details: "Abnormally sleepy, difficult to wake. General danger sign requiring urgent care."
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "destructive";
    case "moderate": return "default";
    case "mild": return "secondary";
    default: return "outline";
  }
};

export function SymptomDiagnosisCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState(symptomData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = symptomData.filter(
      item =>
        item.symptom.toLowerCase().includes(value.toLowerCase()) ||
        item.diagnosis.toLowerCase().includes(value.toLowerCase()) ||
        item.imciClassification.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSymptoms(filtered);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">Symptom → Diagnosis Mapping</CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search symptoms or diagnoses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSymptoms.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <CardTitle className="text-lg">{item.symptom}</CardTitle>
                  <Badge variant={getSeverityColor(item.severity) as any} className="ml-auto">
                    {item.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">IMCI Classification:</p>
                  <p className="text-sm text-muted-foreground">{item.imciClassification}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Diagnosis:</p>
                  <p className="text-sm text-muted-foreground">{item.diagnosis}</p>
                  <Badge variant="outline" className="text-xs mt-1">{item.icd10}</Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Treatment:</p>
                  <p className="text-sm text-muted-foreground">{item.treatment}</p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {item.icon}
                        {item.symptom} - Clinical Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Clinical Assessment:</h4>
                        <p className="text-sm">{item.details}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">IMCI Classification:</h4>
                        <p className="text-sm">{item.imciClassification}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Treatment Protocol:</h4>
                        <p className="text-sm">{item.treatment}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">ICD-10 Code:</h4>
                        <Badge variant="outline">{item.icd10} - {item.diagnosis}</Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-xs text-muted-foreground">
          <p><strong>Sources:</strong> WHO IMCI Chart Booklet 2019, ICD-10-CM 2025, Zambia Standard Treatment Guidelines</p>
        </div>
      </CardContent>
    </Card>
  );
}