import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, ExternalLink } from "lucide-react";

const prescriptionData = {
  pneumonia: {
    condition: "Pneumonia (non-severe)",
    medications: [
      {
        name: "Amoxicillin (oral)",
        dose: "25-50 mg/kg/day",
        route: "PO",
        frequency: "BID",
        duration: "5 days",
        forms: ["125mg/5ml suspension", "250mg capsules"],
        notes: "First-line treatment for fast breathing pneumonia"
      }
    ],
    severe: [
      {
        name: "Ampicillin + Gentamicin",
        dose: "Ampicillin 50mg/kg QID + Gentamicin 7.5mg/kg daily",
        route: "IV/IM",
        frequency: "As specified",
        duration: "Until improvement, then oral",
        forms: ["Injectable"],
        notes: "For severe pneumonia with danger signs"
      }
    ]
  },
  malaria: {
    condition: "Uncomplicated Malaria",
    medications: [
      {
        name: "Artemether-Lumefantrine",
        dose: "Based on weight bands",
        route: "PO",
        frequency: "BID",
        duration: "3 days",
        forms: ["20/120mg tablets"],
        notes: "Weight-based dosing: 5-15kg (1 tab), 15-25kg (2 tabs), 25-35kg (3 tabs)"
      }
    ]
  },
  diarrhea: {
    condition: "Diarrhea with Some Dehydration",
    medications: [
      {
        name: "ORS Solution",
        dose: "75ml/kg over 4 hours",
        route: "PO",
        frequency: "Frequent small amounts",
        duration: "Until rehydrated",
        forms: ["ORS sachets"],
        notes: "Continue breastfeeding, give additional ORS for ongoing losses"
      },
      {
        name: "Zinc Sulfate",
        dose: "10mg (6-59mo) or 20mg (≥5years)",
        route: "PO",
        frequency: "Daily",
        duration: "10-14 days",
        forms: ["10mg tablets", "20mg tablets"],
        notes: "Reduces duration and severity of diarrhea"
      }
    ]
  },
  uti: {
    condition: "Urinary Tract Infection",
    medications: [
      {
        name: "Trimethoprim-Sulfamethoxazole",
        dose: "8mg/kg/day (TMP component)",
        route: "PO",
        frequency: "BID",
        duration: "5-7 days",
        forms: ["40/200mg tablets", "8/40mg per ml suspension"],
        notes: "First-line for uncomplicated UTI"
      }
    ]
  }
};

export function PrescriptionSelector() {
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [childWeight, setChildWeight] = useState<string>("");
  const [calculatedDose, setCalculatedDose] = useState<string>("");

  const calculateDose = (medication: any) => {
    if (!childWeight) return;
    
    const weight = parseFloat(childWeight);
    if (isNaN(weight)) return;

    // Simple dose calculation for demonstration
    if (medication.name.includes("Amoxicillin")) {
      const dosePerKg = 40; // mg/kg/day (middle of 25-50 range)
      const totalDaily = weight * dosePerKg;
      const perDose = totalDaily / 2; // BID
      setCalculatedDose(`${Math.round(perDose)}mg per dose (${Math.round(totalDaily)}mg/day total)`);
    } else if (medication.name.includes("Trimethoprim")) {
      const dosePerKg = 8; // mg/kg/day TMP component
      const totalDaily = weight * dosePerKg;
      const perDose = totalDaily / 2; // BID
      setCalculatedDose(`${Math.round(perDose)}mg TMP per dose (${Math.round(totalDaily)}mg/day total)`);
    } else {
      setCalculatedDose("See dosing guidelines for specific calculation");
    }
  };

  const currentCondition = selectedCondition ? prescriptionData[selectedCondition as keyof typeof prescriptionData] : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">Pediatric Prescription Selector</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="condition">Select Condition</Label>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a condition..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pneumonia">Pneumonia</SelectItem>
                <SelectItem value="malaria">Malaria</SelectItem>
                <SelectItem value="diarrhea">Diarrhea with Dehydration</SelectItem>
                <SelectItem value="uti">Urinary Tract Infection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="weight">Child Weight (kg)</Label>
            <div className="flex gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight..."
                value={childWeight}
                onChange={(e) => setChildWeight(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => currentCondition?.medications[0] && calculateDose(currentCondition.medications[0])}
                disabled={!childWeight || !selectedCondition}
              >
                <Calculator className="h-4 w-4" />
              </Button>
            </div>
            {calculatedDose && (
              <p className="text-sm text-primary mt-1 font-medium">{calculatedDose}</p>
            )}
          </div>
        </div>

        {currentCondition && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{currentCondition.condition}</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium">Standard Treatment:</h4>
              {currentCondition.medications.map((med, index) => (
                <Card key={index} className="border-l-4 border-l-secondary">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-primary">{med.name}</h5>
                        <div className="space-y-1 text-sm">
                          <p><strong>Dose:</strong> {med.dose}</p>
                          <p><strong>Route:</strong> {med.route}</p>
                          <p><strong>Frequency:</strong> {med.frequency}</p>
                          <p><strong>Duration:</strong> {med.duration}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Available Forms:</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {med.forms.map((form, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {form}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{med.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedCondition === "pneumonia" && prescriptionData.pneumonia.severe && (
              <div className="space-y-4">
                <h4 className="font-medium text-destructive">Severe Cases:</h4>
                {prescriptionData.pneumonia.severe.map((med, index) => (
                  <Card key={index} className="border-l-4 border-l-destructive">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-destructive">{med.name}</h5>
                          <div className="space-y-1 text-sm">
                            <p><strong>Dose:</strong> {med.dose}</p>
                            <p><strong>Route:</strong> {med.route}</p>
                            <p><strong>Duration:</strong> {med.duration}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{med.notes}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.who.int/publications/i/item/9789241506823" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              WHO IMCI Guidelines
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#zambia-stg" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Zambia STGs
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p><strong>Important:</strong> Always verify dosing calculations and check for drug allergies before prescribing.</p>
          <p><strong>Sources:</strong> WHO IMCI 2019, Zambia National Formulary 2025, Pediatric Drug Handbook</p>
        </div>
      </CardContent>
    </Card>
  );
}