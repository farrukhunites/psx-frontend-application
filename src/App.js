import AppRoutes from "./Routes/AppRoutes";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#21435C",
          boxShadow: "none",
        },
        components: {
          Input: {
            paddingBlock: 8,
            paddingInline: 12,
          },
        },
      }}
    >
      <div className="App">
        <AppRoutes />
      </div>
    </ConfigProvider>
  );
}

export default App;
