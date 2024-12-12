import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { NavigationRouter } from "./NavigationRouter/NavigationRouter";
import { Provider } from "./Components/ui/provider";
import { NavigationBar } from "./Components/NavigationBar/NavigationBar";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <NavigationBar />
        <NavigationRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
