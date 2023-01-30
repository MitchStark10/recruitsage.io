import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { useMessage } from "./hooks/use-message";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

const AppContent = () => {
  const { data: message } = useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // const formData = new FormData();
    // formData.append("name", name.value);

    // for (let i = 0; i < files.files.length; i++) {
    //   formData.append("files", files.files[i]);
    // }

    // fetch("http://localhost:5000/upload_files", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error("Error occured", err));
  };

  return (
    <div className="App">
      {message}
      <div className="container">
        <h1>File Upload</h1>
        <form id="form" onSubmit={handleSubmit}>
          <input id="file" type="file" />
          <button>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default AppContainer;
