import AuthProvider from "./Context/AuthProvider";
import Signup from "./Components/Signup";
import Main from "./MaterialUI/Main";

function App() {
  return (
    // signup is passed as props.children to AuthProvider
    // <AuthProvider>
    //   <Signup />
    // </AuthProvider>

    // Material UI POC
    <Main />
  );
}

export default App;
