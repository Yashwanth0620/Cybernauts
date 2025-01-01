import React from "react";
import "./styles/Members.css";
const pp = require("../assets/pp.jpg");

export default function Members() {
  return (
    <div className="members">
      <div className="head">
        <h1>Our Team</h1>
        <h2>Meet the passionate minds of Cybernauts</h2>
      </div>

      <div className="search-bar">
        <form action="/search" method="GET">
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search by name, date, description etc"
          />
        </form>
        <select>
          <option value="" disabled selected hidden>
            Filter
          </option>
          <option value="all">All</option>
          <option value="hackathon">Hackathon</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="tech-talk">Tech Talk</option>
        </select>
        <i className="fas fa-chevron-down" type="filter"></i>
      </div>

      <div className="chairperson">
        <div className="section-label">
          <span>Chariperson</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
                <p>
                  This is desc... <br />
                  This is phone...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vice-chairperson">
        <div className="section-label">
          <span>Vice Chariperson</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
                <div className="personal-details">
                  <h4>Team Member</h4>
                  <p>One liner for each member...</p>
                </div>
                <div className="member-img-overlay"></div>
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secretary">
        <div className="section-label">
          <span>Secretary & Vice Secretary</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="finance">
        <div className="section-label">
          <span>Finance</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="documentation">
        <div className="section-label">
          <span>Documentation</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="technical">
        <div className="section-label">
          <span>Technical</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="graphics">
        <div className="section-label">
          <span>Graphics</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="outreach">
        <div className="section-label">
          <span>Outreach</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-management">
        <div className="section-label">
          <span>Event Management</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="executive-Boys">
        <div className="section-label">
          <span>Executive-Boys</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="executive-Girls">
        <div className="section-label">
          <span>Executive-Girls</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
