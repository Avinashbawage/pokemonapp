/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';

function Sidebar() {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [moves1, setMoves1] = useState([]);
  const [moves2, setMoves2] = useState([]);
  const [stat1, setStat1] = useState([]);
  const [stat2, setStat2] = useState([]);
  const [stat3, setStat3] = useState([]);
  const [stat4, setStat4] = useState([]);
  const [stat5, setStat5] = useState([]);

  const [names, setNames] = useState([]);
  

  const now = 60;

  let Params = useParams();

  console.log("This is params", Params);

  // Fulldetails
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${Params.productid}`)
      .then((res) => {
        setPosts(res.data);
        console.log("Alldata", res.data);
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${Params.productid}`)
      .then((res) => {
        setPosts1(res.data.abilities[0].ability.name);
        setPosts2(res.data.abilities[1].ability.name);
        setMoves1(res.data.moves[0].move.name);
        setMoves2(res.data.moves[1].move.name);
        setStat1(res.data.stats[0].base_stat);
        setStat2(res.data.stats[1].base_stat);
        setStat3(res.data.stats[2].base_stat);
        setStat4(res.data.stats[3].base_stat);
        setStat5(res.data.stats[4].base_stat);
        console.log("Moves", res.data);
      })
      .catch((error) => error);
  }, []);

  //FullNames
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => {
        setNames(res.data.results);
        console.log("FullNames", res.data);
      })
      .catch((error) => error);
  }, []);

 
  console.log("Moves");

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          
          <div className="sidebarleft  col-4 fs-4 leftsidenavbar">
            <ul className="text-start">
              <li className="text-start"> <img src="./pokemonlogo.png" alt="" className="pokemonlogo text-start" /></li>
              {names.map((items, index) => (
                <li key={items.name} className="text-start">
                  {" "}
                  <a href={`${index + 1}`}> {items.name.charAt(0).toUpperCase()+ items.name.slice(1)} </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-8">
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Params.productid}.png`}
                alt=""
                className="rightsideimage"
              />
              <h2>{posts.name}  </h2>
              <div>Experience:{posts.base_experience} </div>
              <div>Height: {posts.height} </div>
              <div>
                Abilities: {posts1} ,{posts2}{" "}
              </div>
              <div>
                Moves: {moves1} , {moves2}{" "}
              </div>
            </div>

            <br />
            
            <div>
              <h2>Statistics</h2>
  
              <div>
                <span>Stat1:</span>
                <ProgressBar variant="warning"  now={stat1} label={`${stat1}%`} />       
              
              </div>
              <div>Stat2:
              <ProgressBar variant="warning"  now={stat2} label={`${stat2}%`} />
                  </div>
              <div>Stat3:
              <ProgressBar variant="warning"  now={stat3} label={`${stat3}%`} />
                 </div>
              <div>Stat4: 
              <ProgressBar variant="warning"  now={stat4} label={`${stat4}%`} />
               </div>
              <div>Stat5: 
              <ProgressBar variant="warning"  now={stat5} label={`${stat5}%`} />
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
