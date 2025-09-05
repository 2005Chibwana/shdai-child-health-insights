import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search } from "lucide-react";

const vitalsData = [
  {
    metric: "Respiratory Rate",
    ageGroup: "2-11 months",
    threshold: "≥50/min",
    action: "Fast breathing - pneumonia",
    severity: "moderate",
    link: "/consultation"
  },
  {
    metric: "Respiratory Rate",
    ageGroup: "12-59 months",
    threshold: "≥40/min",
    action: "Fast breathing - pneumonia",
    severity: "moderate",
    link: "/consultation"
  },
  {
    metric: "Oxygen Saturation",
    ageGroup: "All ages",
    threshold: "<90%",
    action: "Severe hypoxia - admit",
    severity: "critical",
    link: "/admission"
  },
  {
    metric: "Temperature",
    ageGroup: "All ages",
    threshold: "≥37.5°C",
    action: "Fever assessment",
    severity: "mild",
    link: "/consultation"
  },
  {
    metric: "MUAC",
    ageGroup: "6-59 months",
    threshold: "<11.5cm",
    action: "Severe acute malnutrition",
    severity: "critical",
    link: "/nutrition"
  },
  {
    metric: "Weight-for-Height Z-score",
    ageGroup: "All ages",
    threshold: "<-3 SD",
    action: "Severe wasting",
    severity: "critical",
    link: "/nutrition"
  },
  {
    metric: "Heart Rate",
    ageGroup: "2-11 months",
    threshold: ">160/min",
    action: "Tachycardia assessment",
    severity: "moderate",
    link: "/triage"
  },
  {
    metric: "Heart Rate",
    ageGroup: "12-59 months",
    threshold: ">120/min",
    action: "Tachycardia assessment",
    severity: "moderate",
    link: "/triage"
  },
  {
    metric: "Blood Pressure",
    ageGroup: "All ages",
    threshold: "Systolic <70 + (2×age in years)",
    action: "Hypotension - shock",
    severity: "critical",
    link: "/emergency"
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

export function VitalsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(vitalsData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = vitalsData.filter(
      item =>
        item.metric.toLowerCase().includes(value.toLowerCase()) ||
        item.ageGroup.toLowerCase().includes(value.toLowerCase()) ||
        item.action.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">Pediatric Vital Signs & Growth Thresholds</CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search metrics, age groups, or actions..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Clinical Action</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.metric}</TableCell>
                  <TableCell>{item.ageGroup}</TableCell>
                  <TableCell className="font-mono text-sm">{item.threshold}</TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(item.severity) as any}>
                      {item.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={item.link}>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <p><strong>Sources:</strong> WHO IMCI Chart Booklet 2019, WHO Pocket Book 2013, Zambia STGs 2025</p>
          <p><strong>Note:</strong> MUAC = Mid-Upper Arm Circumference, SD = Standard Deviation</p>
        </div>
      </CardContent>
    </Card>
  );
}