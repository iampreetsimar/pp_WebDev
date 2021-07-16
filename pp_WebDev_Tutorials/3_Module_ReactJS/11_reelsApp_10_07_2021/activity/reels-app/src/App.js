import AuthProvider from "./Context/AuthProvider";
import Signup from "./Components/Signup";

function App() {
  return (
    // signup is passed as props.children to AuthProvider
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}

export default App;
