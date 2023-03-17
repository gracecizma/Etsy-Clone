import React from "react";
import "./About.css";
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="what-is">What is Handmade Haven?</div>
        <div className="about-block">
          <div className="about-desc">
            A community doing good
            <div className="about-header">
              Handmade Haven is a global online marketplace, where people come
              together to make, sell, buy, and collect unique items. We’re also
              a community pushing for positive change for small businesses,
              people, and the planet.
            </div>
          </div>
          <div className="about-desc">
            Support independent creators
            <div className="about-header">
              {" "}
              There’s no Handmade Haven warehouse – just millions of people
              selling the things they love. We make the whole process easy,
              helping you connect directly with makers to find something
              extraordinary.
            </div>
          </div>
          <div className="about-desc">
            {" "}
            Peace of mind
            <div className="about-header">
              {" "}
              Your privacy is the highest priority of our dedicated team. And if
              you ever need assistance, we are always ready to step in for
              support.
            </div>
          </div>
        </div>
        <div className="have-question"></div>
      </div>
      <div className="links-container">
        <div className="link-header">Contributer Links</div>
        <div className="links">
          Brennan Cota:&nbsp;{" "}
          <a href="https://github.com/Sleightttt" target="_blank">
            Github
          </a>
          &nbsp;•&nbsp;
          <a
            href="https://www.linkedin.com/in/brennan-cota-11768aa6/"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="links">
          Kyle Parkin: &nbsp;
          <a href="https://github.com/13kparkin" target="_blank">
            Github
          </a>
          &nbsp;•&nbsp;
          <a
            href="https://www.linkedin.com/in/kyle-parkin-25a5b913a/"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="links">
          Sarah Nodwell:&nbsp;{" "}
          <a href="https://github.com/SaintCamber" target="_blank">
            Github
          </a>
          &nbsp;•&nbsp;
          <a
            href="https://www.linkedin.com/in/sarah-nodwell-77a171217/"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <div className="links">
          Grace Cizma:&nbsp;{" "}
          <a href="https://www.linkedin.com/in/gracescizma/" target="_blank">
            Github
          </a>
          &nbsp;•&nbsp;
          <a href="https://github.com/gracecizma" target="_blank">
            Linkedin
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
