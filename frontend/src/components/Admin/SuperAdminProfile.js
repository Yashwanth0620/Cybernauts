import React, { useState } from "react";
import pp from "../../assets/pp.jpg";
import "../styles/SuperAdminprofile.css";
export default function SuperAdminProfile() {
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "SuperAdmin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("User Added:", newUser);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div className="SuperAdmin">
        <div className="SuperAdminContainer">
          <div className="SuperAdmin-Main">
            <div className="SuperAdminImg">
              <img src={pp}></img>
            </div>
            <div className="SuperAdminDetails">
              <h1 className="item">Mr Rakesh</h1>
              <h1 className="item">7780******</h1>
              <h1 className="item">superadmin@cvr.ac.in</h1>
            </div>
          </div>
          <div className="SuperAdmin-Body">
            <div className="SuperAdminsManage">
              <div className="Addbut">
                <h1>SuperAdmins</h1>
                <button
                  onClick={() => {
                    console.log("Button clicked");
                    setShowPopup(true);
                  }}
                >
                  Add-SuperAdmin+
                </button>

                {showPopup && (
                  <div className="popup">
                    <div className="popup-content">
                      <h2>Add {newUser.role}</h2>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleChange}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newUser.phone}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="role"
                        value={newUser.role}
                        disabled
                      />
                      <button onClick={handleSubmit}>Add</button>
                      <button onClick={closePopup}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <span></span>

            <div className="AdminsManage">
              <div className="Addbut">
                <h1>Admins</h1>
                <button>Add-Admin+</button>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="ManageContainer">
                <div className="item">Name</div>
                <div className="item">9980******</div>

                <div className="butons">
                  <button className="icon-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="icon-button delete">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
