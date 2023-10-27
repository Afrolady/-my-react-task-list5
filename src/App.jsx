import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <>
        <Header />
        <TaskList />
      </>
    </ChakraProvider>
  );
}

export default App;