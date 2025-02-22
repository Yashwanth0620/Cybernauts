import React, { useState } from "react";
import "../styles/MemberProfile.css";
import pp from "../../assets/pp.jpg";
export default function MemberProfile(member) {
  return (
    <>
      <div className="MemberProfile">
        <div className="MemberProfile-container">
          <div className="MemberProfile-main">
            <h1>Designation</h1>
            <img src={pp}></img>
            <div className="items">
              <h3>Name : {member.name}</h3>
              <h3>Roll No : {member.rollno}</h3>
              <h3>Year : {member.year}</h3>
              <h3>Phone no : {member.phoneno}</h3>
              <h3>Email : {member.email}</h3>
            </div>
          </div>
          <div className="MemberProfile-body">
            <h1>Contribution :</h1>
           
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="contribut-container">
              <div className="item">{member.description}</div>
              <div className="item">Event:{"Hello"}</div>
              <div className="item">
               <button className="view-img">View-image</button>
               </div>
              <div className="item">
                <button className="icon-button">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="icon-button delete">
                <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
}
