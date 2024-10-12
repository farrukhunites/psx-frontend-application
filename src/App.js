import AppRoutes from "./Routes/AppRoutes";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#173442",
          colorLink: "#3A8DF8",
          colorInfo: "#2D9CDB",
          colorSuccess: "#2D9CDB",
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
