// SOLUTION 1
// function Profile() {
//     const [profile, setProfile] = useState({
//         name: "Backbencher",
//         age: 23
//     })
    
//     const onNameChange = (e) => {
//         setProfile({...profile, name: e.target.value});
//     }

//     const onAgeChange = (e) => {
//         setProfile({...profile, age: e.target.value});
//     }

//     return (
//         <div>
//             <form>
//                 <input type="text" value={profile.name} onChange={onNameChange} />
//                 <input type="text" value={profile.age} onChange={onAgeChange} />
//                 <h2>Name: {profile.name}, Age: {profile.age}</h2>
//             </form>
//         </div>
//     )
// }
// ************************************************************************************

// SOLUTION 2
// function Banner() {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         console.log("Boom");
//     })

//     return (
//         <div>
//             <button onClick={() => setCount(count + 1)}>State: {count}</button>
//         </div>
//     )
// }
// ************************************************************************************

// SOLUTION 3
// function Counter() {
//     const [count, setCount] = useState(0);

//     const incrementCount = () => {
//         setCount(count + 1);
//     }

//     return (
//         <div>
//             <button onClick={incrementCount}>State: {count}</button>
//         </div>
//     )
// }
// ************************************************************************************

// SOLUTION 4
// function Banner() {
//     const [count, setCount] = useState(0);
//     const [name, setName] = useState("");

//     useEffect(() => {
//         console.log("Count is updated");
//     }, [count]);

//     return (
//         <div>
//             <button onClick={() => setCount(count + 1)}>State: {count}</button>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
//         </div>
//     )
// }
// ************************************************************************************

// SOLUTION 5 - OUTPUT : 1 \n 1
// REASONING: The current context value is determined by value prop of nearest MyContext.Provider above the calling component
// Calling Component here is MyComponent, above that we don't have a MyContext.Provider, so default value is used
// *********** READ USECONTEXT DOCUMENTATION ************
// import React, { createContext, useContext } from 'react';
// const MyContext = createContext(1);
// const MyComponent = () => (
//     <>
//         <p>{useContext(MyContext)}</p>
//         <MyContext.Provider value={2}>
//             <p>{useContext(MyContext)}</p>
//         </MyContext.Provider>
//     </>
// );
// export default MyComponent;
// ************************************************************************************

// SOLUTION 6 - OUTPUT: Home and login both will render
// Use switch and exact on home route for correct path
// Component rendered on navigating /login
// ReactDOM.render((
//     <Router>
//         <div>
//             <Route path="/" render={Home} />
//             <Route path="/login" render={Login} />
//         </div>
//     </Router>), document.getElementById('root')
// );
// ************************************************************************************

// SOLUTION 7
// Use switch and exact in App route or use exact in both app and dashboard routes
// import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';

// const App = () => {
//     return (<div>App</div>)
// }

// const Dashboard = () => {
//     return (<div>Dashboard</div>)
// }

// const Profile = () => {
//     return (<div>Profile</div>)
// }

// const Router = () => {
//     return (
//         <BrowserRouter>
//             <Route path='/' component={App}></Route>
//             <Route path='/dashboard/profile' component={Profile}></Route>
//             <Route path='/dashboard' component={Dashboard}></Route>
//         </BrowserRouter>
//     )
// }
// ************************************************************************************

// SOLUTION 9
// useEffect(() => {
//     window.addEventListener("mousemove", handleMousePosition);
//     return () => {
//         window.removeEventListener("mousemove", handleMousePosition);
//     }
// }, [])
// ************************************************************************************

// SOLUTION 10
// import React, { useContext } from 'react';
// import NameContext from "ProviderComponent";
// import AgeContext from "ProviderComponent";

// function Test2() {
//     const name = useContext(NameContext);
//     const age = useContext(AgeContext);
//     return (
//         <div>
//             <h1>Name: {name}, Age: {age}</h1>
//         </div>
//     )
// }
// export default Test2
// ************************************************************************************