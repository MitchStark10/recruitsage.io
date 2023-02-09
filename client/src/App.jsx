import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { useMessage } from "./hooks/use-message";
import { useState } from "react";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

const AppContent = () => {
  const { data: message } = useMessage();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData()
    formData.append('upload', file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const jsonData = await response.json();
      console.log('jsonData: ', jsonData);
    } else {
      console.error('Error uploading file');
    }
  };

  return (
    <div className="App">
      {message}
      <div>
        <input type="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  );
};

export default AppContainer;
