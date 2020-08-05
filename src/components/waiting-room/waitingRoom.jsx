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
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <p style={{fontSize: "50px", color: "rgb(216,81,182)"}}>Waiting for opponent</p>
                  </a>
              </div>
  );
}