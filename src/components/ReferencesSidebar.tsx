import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ExternalLink, FileText, Book, Download } from "lucide-react";

const references = [
  {
    id: 1,
    title: "WHO IMCI Chart Booklet",
    year: "2019",
    publisher: "World Health Organization",
    description: "Integrated Management of Childhood Illness chart booklet for healthcare workers",
    category: "Primary Guidelines",
    url: "https://www.who.int/publications/i/item/9789241506823",
    relatedSections: ["Triage", "Consultation", "Diagnosis"],
    type: "PDF"
  },
  {
    id: 2,
    title: "WHO Pocket Book of Hospital Care for Children",
    year: "2013",
    publisher: "World Health Organization",
    description: "Guidelines for the management of children and adolescents at first-referral level",
    category: "Clinical Guidelines",
    url: "https://www.who.int/publications/i/item/978-92-4-151571-6",
    relatedSections: ["Emergency Care", "Admission", "Pharmacy"],
    type: "PDF"
  },
  {
    id: 3,
    title: "Zambia Standard Treatment Guidelines",
    year: "2025",
    publisher: "Ministry of Health, Zambia",
    description: "National treatment protocols for common conditions in Zambian healthcare settings",
    category: "National Guidelines",
    url: "#zambia-stg",
    relatedSections: ["Prescription", "Diagnosis", "Pharmacy"],
    type: "Document"
  },
  {
    id: 4,
    title: "Zambia National Formulary",
    year: "2025",
    publisher: "Ministry of Health, Zambia",
    description: "Essential medicines list and dosing guidelines for Zambia",
    category: "Pharmaceutical",
    url: "#zambia-formulary",
    relatedSections: ["Prescription", "Pharmacy"],
    type: "Reference"
  },
  {
    id: 5,
    title: "UNICEF IMCI Job Aids",
    year: "2020",
    publisher: "UNICEF",
    description: "Quick reference cards for healthcare workers implementing IMCI",
    category: "Job Aids",
    url: "https://www.unicef.org/health/maternal-and-newborn-health",
    relatedSections: ["Triage", "Consultation"],
    type: "Cards"
  },
  {
    id: 6,
    title: "WHO Growth Standards",
    year: "2023",
    publisher: "World Health Organization",
    description: "Child growth standards and anthropometric references",
    category: "Growth & Nutrition",
    url: "https://www.who.int/tools/child-growth-standards",
    relatedSections: ["Triage", "Nutrition Assessment"],
    type: "Charts"
  },
  {
    id: 7,
    title: "ICD-10-CM Pediatric Codes",
    year: "2025",
    publisher: "WHO/CDC",
    description: "International Classification of Diseases codes for pediatric conditions",
    category: "Coding",
    url: "https://www.icd10data.com/",
    relatedSections: ["Diagnosis", "Medical Records"],
    type: "Database"
  },
  {
    id: 8,
    title: "Severe Acute Malnutrition Guidelines",
    year: "2022",
    publisher: "WHO/UNICEF",
    description: "Management of severe acute malnutrition in children under 5",
    category: "Nutrition",
    url: "https://www.who.int/publications/i/item/9789240025257",
    relatedSections: ["Nutrition", "Feeding Programs"],
    type: "Manual"
  }
];

const categories = [...new Set(references.map(ref => ref.category))];

export function ReferencesSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredReferences = selectedCategory
    ? references.filter(ref => ref.category === selectedCategory)
    : references;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Primary Guidelines": "default",
      "Clinical Guidelines": "secondary", 
      "National Guidelines": "destructive",
      "Pharmaceutical": "outline",
      "Job Aids": "default",
      "Growth & Nutrition": "secondary",
      "Coding": "outline",
      "Nutrition": "secondary"
    };
    return colors[category as keyof typeof colors] || "outline";
  };

  return (
    <Card className="w-full max-w-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="justify-between p-0 h-auto">
              <CardTitle className="text-primary flex items-center gap-2">
                <Book className="h-5 w-5" />
                Clinical Reference Library
              </CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All ({references.length})
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredReferences.map((ref) => (
                  <Card key={ref.id} className="border-l-4 border-l-accent">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm leading-tight">{ref.title}</h4>
                          <Badge variant={getCategoryColor(ref.category) as any} className="text-xs">
                            {ref.type}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">{ref.description}</p>
                        
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-medium">{ref.publisher}</span>
                          <span className="text-muted-foreground">({ref.year})</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {ref.relatedSections.map((section, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <a href={ref.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </a>
                          </Button>
                          {ref.type === "PDF" && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredReferences.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No references found in this category</p>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}