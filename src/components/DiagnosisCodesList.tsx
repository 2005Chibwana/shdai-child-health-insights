import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Filter } from "lucide-react";

const diagnosisData = [
  {
    condition: "Malaria",
    icd10: "B54",
    fullName: "Unspecified malaria",
    imciClassification: "Fever in malaria endemic area",
    category: "Infectious",
    frequency: "Very Common",
    treatment: "Artemether-lumefantrine",
    complications: "Severe malaria, cerebral malaria"
  },
  {
    condition: "Pneumonia",
    icd10: "J18.9",
    fullName: "Pneumonia, unspecified organism",
    imciClassification: "Fast breathing pneumonia / Severe pneumonia",
    category: "Respiratory",
    frequency: "Very Common",
    treatment: "Amoxicillin (outpatient) / Ampicillin + Gentamicin (severe)",
    complications: "Pleural effusion, sepsis"
  },
  {
    condition: "Diarrhea (Infectious)",
    icd10: "A09",
    fullName: "Infectious gastroenteritis and colitis, unspecified",
    imciClassification: "Diarrhea / Diarrhea with dehydration",
    category: "Gastrointestinal",
    frequency: "Very Common",
    treatment: "ORS, zinc supplementation",
    complications: "Severe dehydration, shock"
  },
  {
    condition: "Dehydration",
    icd10: "E86.0",
    fullName: "Dehydration",
    imciClassification: "Some dehydration / Severe dehydration",
    category: "Metabolic",
    frequency: "Common",
    treatment: "ORS / IV fluids",
    complications: "Hypovolemic shock"
  },
  {
    condition: "Urinary Tract Infection",
    icd10: "N39.0",
    fullName: "Urinary tract infection, site not specified",
    imciClassification: "Possible serious bacterial infection",
    category: "Genitourinary",
    frequency: "Common",
    treatment: "Trimethoprim-sulfamethoxazole",
    complications: "Pyelonephritis, urosepsis"
  },
  {
    condition: "Malnutrition (Severe)",
    icd10: "E43",
    fullName: "Unspecified severe protein-energy malnutrition",
    imciClassification: "Severe acute malnutrition",
    category: "Nutritional",
    frequency: "Common",
    treatment: "Therapeutic feeding, RUTF",
    complications: "Kwashiorkor, marasmus"
  },
  {
    condition: "Anemia",
    icd10: "D64.9",
    fullName: "Anemia, unspecified",
    imciClassification: "Anemia",
    category: "Hematologic",
    frequency: "Very Common",
    treatment: "Iron supplementation",
    complications: "Severe anemia, heart failure"
  },
  {
    condition: "Sepsis",
    icd10: "A41.9",
    fullName: "Sepsis, unspecified organism",
    imciClassification: "Very severe disease",
    category: "Infectious",
    frequency: "Less Common",
    treatment: "IV antibiotics, supportive care",
    complications: "Septic shock, organ failure"
  },
  {
    condition: "Meningitis",
    icd10: "G03.9",
    fullName: "Meningitis, unspecified",
    imciClassification: "Very severe disease",
    category: "Neurologic",
    frequency: "Less Common",
    treatment: "IV ceftriaxone",
    complications: "Brain damage, death"
  },
  {
    condition: "Skin Infection",
    icd10: "L08.9",
    fullName: "Local infection of skin and subcutaneous tissue, unspecified",
    imciClassification: "Skin condition",
    category: "Dermatologic",
    frequency: "Common",
    treatment: "Topical/oral antibiotics",
    complications: "Cellulitis, abscess"
  }
];

export function DiagnosisCodesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(diagnosisData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, categoryFilter);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    applyFilters(searchTerm, value);
  };

  const applyFilters = (search: string, category: string) => {
    let filtered = diagnosisData;

    if (search) {
      filtered = filtered.filter(
        item =>
          item.condition.toLowerCase().includes(search.toLowerCase()) ||
          item.icd10.toLowerCase().includes(search.toLowerCase()) ||
          item.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.imciClassification.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredData(filtered);
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Very Common": return "default";
      case "Common": return "secondary";
      case "Less Common": return "outline";
      default: return "outline";
    }
  };

  const categories = [...new Set(diagnosisData.map(item => item.category))];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">Pediatric Diagnosis Codes (ICD-10)</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conditions, ICD codes, or classifications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filteredData.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{item.condition}</h4>
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.icd10}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.fullName}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant={getFrequencyColor(item.frequency) as any}>
                        {item.frequency}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-1">IMCI Classification:</h5>
                    <p className="text-sm text-muted-foreground mb-3">{item.imciClassification}</p>
                    
                    <h5 className="font-medium mb-1">Treatment:</h5>
                    <p className="text-sm text-muted-foreground">{item.treatment}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-1">Potential Complications:</h5>
                    <p className="text-sm text-muted-foreground mb-3">{item.complications}</p>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://www.icd10data.com/ICD10CM/Codes/${item.icd10.charAt(0)}00-${item.icd10.charAt(0)}99/${item.icd10}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          ICD-10
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/consultation" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          IMCI
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No diagnoses found matching your search criteria.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setFilteredData(diagnosisData);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="mt-6 text-xs text-muted-foreground">
          <p><strong>Sources:</strong> ICD-10-CM 2025, WHO IMCI Chart Booklet 2019, Zambia Standard Treatment Guidelines</p>
          <p><strong>Note:</strong> These are the most common pediatric diagnoses in Zambian healthcare settings</p>
        </div>
      </CardContent>
    </Card>
  );
}