import React from 'react';
import './waitingRoom.css';

export default function WaitingRoom() {
 
  return (         
              <div style={{
                      
                      backgroundColor: "white", 
                      width: "100%",
                      display: "flex", 
                      justifyContent: "center",
                      marginTop: "75px",
                    }}>
                  <a style={{marginTop: "250px",
                            marginBottom: "250px"
                            }}>
                      <span style={{background: "rgb(200, 0, 175)"}}></span>
                      <span style={{background: "rgb(200, 0, 175)"}}></span>
                      <span style={{background: "rgb(200, 0, 175)"}}></span>
                      <span style={{background: "rgb(200, 0, 175)"}}></span>
                      <p style={{fontSize: "50px", color: "rgb(200, 0, 175)"}}>Waiting for opponent</p>
                  </a>
              </div>
  );
}