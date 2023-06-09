import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import ModelCard from "../Model/ModelCard";
import styles from "../../styles/Home.module.css";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";

function Home() {
  const [featuredModels, setFeaturedModels] = useState([]);
  const authContext = useContext(AuthContext);
  const isUserLoggedIn = authContext.isUserLoggedIn;
  const url = "http://localhost:5000/static/Sample.stl";
  const style = {
    width: "100%",
    height: "100%",
  };
  const getFeaturedModels = useCallback(async () => {
    const requestSender = new RequestSender();
    const result = await requestSender.get(`/featuredModels`);
    setFeaturedModels(result);
  }, []);

  useEffect(() => {
    getFeaturedModels();
  }, [getFeaturedModels]);

  return (
    <>
      <article className={styles["hero"]}>
        <div className="hero-left">
          <p>
            Upload your
            <br />
            <span>.STL model</span>
            <br />
            <small>designs and share them with others!</small>
            <br />
            {!isUserLoggedIn ? (
              <>
                <small className="hero-left-links">
                  <Link to="/login">Login</Link> or{" "}
                  <Link to="/register">register</Link> now.
                </small>
              </>
            ) : (
              <>
                <small className="hero-left-links">
                  View the <Link to="/models">models</Link> now.
                </small>
              </>
            )}
          </p>
        </div>
        <div className="hero-right">
          <StlViewer
            style={style}
            orbitControls
            shadows
            url={url}
            modelProps={{ scale: 2 }}
          />
        </div>
      </article>
      <article className="featured">
        <h3>Featured models</h3>
        {featuredModels.length ? (
          <div className={styles["featured-models"]}>
            {featuredModels.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
          </div>
        ) : (
          <h3>There are no featured models at this time.</h3>
        )}
      </article>
    </>
  );
}

export default Home;
