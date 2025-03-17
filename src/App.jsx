import "./assets/styles/main.scss";
import Layout from "./components/Layout";
import AppRouter from "./routes/router";

function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
