import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { NavigationRouter } from "./NavigationRouter/NavigationRouter";
import { Provider } from "./Components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationBar } from "./Screens/NavigationBarModule/NavigationBarModule";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./Components/ui/toaster";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Provider>
          <BrowserRouter>
            <NavigationBar />
            <NavigationRouter />
            <Toaster />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
