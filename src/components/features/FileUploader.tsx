import { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadFile, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/supabaseStorage';

interface FileUploaderProps {
  onUploadComplete?: (path: string) => void;
  folder?: string;
}

const FileUploader = ({ onUploadComplete, folder = 'receipts' }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a supported file type",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const path = `${folder}/${Date.now()}-${selectedFile.name}`;
      await uploadFile(selectedFile, path);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      setSelectedFile(null);
      onUploadComplete?.(path);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          accept={ALLOWED_FILE_TYPES.join(',')}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop a file here, or click to select
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Maximum file size: 5MB
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;