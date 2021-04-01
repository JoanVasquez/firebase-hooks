import AddTimeEntryForm from "./components/add-time-entry-form";
import TimeList from "./components/time-list";

function App() {
  return (
    <div className="container">
      <h1>Just Clock it</h1>
      <TimeList />
      <AddTimeEntryForm />
    </div>
  );
}

export default App;
