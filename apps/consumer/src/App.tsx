import RemoteEntry from "producer/RemoteEntry";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Host</h1>
      <div style={{ border: "1px solid white" }}>
        <h2>Remote</h2>
        <RemoteEntry />
      </div>
    </div>
  );
}

export default App;
