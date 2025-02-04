import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DocumentProcessor from "./DocumentProcessor";

const ResearchInterface = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching with model:", selectedModel, "Query:", query);
  };

  return (
    <div className="space-y-6">
      <DocumentProcessor />
      
      <Card className="p-6 space-y-6 bg-white">
        <h2 className="text-2xl font-bold text-primary">Legal Research</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Model
            </label>
            <Select onValueChange={setSelectedModel} value={selectedModel}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="nlp">Pre-trained NLP Model</SelectItem>
                <SelectItem value="westlaw">WestlawAPI</SelectItem>
                <SelectItem value="caselaw">CaselawBERT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Query
            </label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your legal research query..."
              className="w-full bg-white"
            />
          </div>

          <Button onClick={handleSearch} className="w-full">
            Start Research
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResearchInterface;