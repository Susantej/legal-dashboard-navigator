
import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_DOCUMENT_URL + "documents/upload";

interface DocumentUpload {
  analysis: {
    type: string;
    location: string;
    filingDate: string;
    amounts: string[];
    judgeName?: string;
    plaintiffs?: string[];
    defendants?: string[];
    claimants?: string[];
  },
  document: {
    id: string;
    structuredData: {
      extractedText: string;
      analysis: {
        date: string;
        summary: string;
        caseNumber: string;
        amount: string;
      }
    }
  }
}

const Document = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<DocumentUpload>(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status == 201) {
        setAnalysis(response.data);
        toast.success(response.data.message);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        console.error(response.data);
      }
    } catch (err) {
      setError("Upload failed. Please try again.");
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Upload Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Document Upload</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.txt"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</span>
              <span className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</span>
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{file.name}</span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full py-2 px-4 bg-amber-800 text-white rounded-lg hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Analyze Document"
            )}
          </button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Right side - Analysis Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Analysis Results</h2>

          {analysis ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Document Type</h3>
                    <p className="mt-1 text-lg">{analysis.analysis?.type || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-lg">{analysis.analysis?.location || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Case Number</h3>
                    <p className="mt-1 text-lg">{analysis.document?.structuredData?.analysis?.caseNumber || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Filing Date</h3>
                    <p className="mt-1 text-lg">{analysis.document?.structuredData?.analysis?.date || "N/A"}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-500">Parties</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Plaintiffs:</span> {analysis.analysis?.plaintiffs ? analysis.analysis.plaintiffs.length > 1 ? analysis.analysis.plaintiffs.join(", ") : analysis.analysis.plaintiffs[0] : "N/A"}
                    </p>
                    <p className="text-sm">
                    <span className="font-medium">Claimants:</span> {analysis.analysis?.claimants ? analysis.analysis.claimants.length > 1 ? analysis.analysis.claimants.join(", ") : analysis.analysis.claimants[0] : "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Defendants: </span>
                      {analysis.analysis?.defendants
                        ? analysis.analysis.defendants.length > 1
                          ? analysis.analysis.defendants.join(", ")
                          : analysis.analysis.defendants[0]
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-500">Monetary Amounts</h3>
                  <div className="mt-2">
                    {analysis.document?.structuredData?.analysis?.amount? 
                        // 
                          <p>{analysis.document.structuredData.analysis.amount}</p>
                      
                    :
                      "No amounts found"
                    }
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-500">Judge</h3>
                  <p className="mt-1 text-lg">{analysis.analysis?.judgeName || "N/A"}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Document Summary</h3>
                <div className="max-h-48 overflow-y-auto text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {analysis.document?.structuredData?.analysis?.summary ? (
                    analysis.document.structuredData.analysis.summary.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))
                  ) : (
                    <p className="text-gray-500">No text extracted</p>
                  )}
                </div>

              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">Upload a document to see analysis results</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Document;
