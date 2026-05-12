import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


useEffect(() => {
  const userId = localStorage.getItem("userId");



  if (!userId || userId === "undefined") return;  //add change




  console.log("DEBUG userId:", userId);

  if (!userId || userId === "undefined") {
    console.log("No valid userId found");
    return;
  }

  const fetchRepositories = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/repo/user/${userId}`
      );

      const data = await response.json();
      console.log("Repos:", data);
      setRepositories(data.repositories || []);                         //add repositories

      // setRepositories(data || []);  //add ->comment
      // setRepositories(data) //added
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };


 const fetchSuggestedRepositories = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/repo/all`
      );

      const data = await response.json();
      console.log("Repos:", data);
      //console.log(data);
      setSuggestedRepositories(data || []);                         //add repositories
      console.log(suggestedRepositories);
      //setRepositories(data || []); // added ->comment
      // setRepositories(data) //added
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };













  fetchRepositories();
  fetchSuggestedRepositories();
}, []);










//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
      
//         const response = await fetch(
//           `http://localhost:3002/repo/user/${userId}`
//         );
//         const data = await response.json();
//         console.log(data);
// };

//     fetchRepositories();
//   }, []);
useEffect(()=>{
  if(searchQuery == ""){
    setSearchResults(repositories);
  }
  else{
    const filteredRepo = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    setSearchResults(filteredRepo);
  }
}, [searchQuery, repositories]);

return ( 
//   <> <Navbar/>
// <section id="dashboard" className="dashboard-layout">
//   <aside>
//     <h3>Suggested Repositories </h3>
//     {suggestedRepositories.map((repo) => { 
//       return (<div key={repo._id}>
//         <h4>{repo.name}</h4>
//          <h4>{repo.description}</h4>
//        </div>
//       )
//     })}
//   </aside>
//   <main>
//     <h2>Your Repositories </h2>
//     <div id="search">
//       <input type="text" value={searchQuery} placeholder="Search..." onChange={(e)=>setSearchQuery(e.target.value)}/>
//     </div>
//     {searchResults.map((repo) => { 
//       return (<div key={repo._id}>
//         <h4>{repo.name}</h4>
//          <h4>{repo.description}</h4>
//        </div>
//       )
//     })}
//   </main>
//   <aside>
//     <h3>Upcoming Events</h3>
//     <ul>
//       <li><p>Tech Conference - Dec 15</p></li>
//       <li><p>Developer Meetup - jan 10</p></li>
//       <li><p>React Summit - sep 27</p></li>
//     </ul>
//   </aside>
// </section>
// </>



<>
  <Navbar />

  <section id="dashboard" className="dashboard-layout">

    {/* LEFT SIDEBAR */}
    <aside className="sidebar">
      <h3>Suggested Repositories</h3>

      {suggestedRepositories.map((repo) => (
        <div key={repo._id} className="item">
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>
        </div>
      ))}
    </aside>

    {/* MAIN */}
    <main className="main">

      <div className="top-header">
        <h2>Your Repositories</h2>

        <input
          type="text"
          value={searchQuery}
          placeholder="Search repositories..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchResults.map((repo) => (
        <div key={repo._id} className="repo-row">
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>
        </div>
      ))}
    </main>

    {/* RIGHT SIDEBAR */}
    <aside className="sidebar right">
      <h3>Upcoming Events</h3>

      <div className="item">
        <p>Tech Conference - Dec 15</p>
      </div>

      <div className="item">
        <p>Developer Meetup - Jan 10</p>
      </div>

      <div className="item">
        <p>React Summit - Sep 27</p>
      </div>
    </aside>

  </section>
</>
);

};
export default Dashboard;