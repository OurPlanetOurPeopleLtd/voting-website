import "./Welcome.scss";
// Remove: import {redirect} from "react-router-dom";

const Welcome = () => {

    return (
        <div className="frame">
            <div className="frame-content">
                <h1 className="frame__heading">Welcome</h1>
                <div className="landing-content__buttons">
                    <div>
                        <button
                            className="btn btn--white"
                            // Correct JS for navigating to an external URL
                            onClick={() => window.location.href = "https://voting-website-env-ai-site-our-people-our-planet.vercel.app/"}
                        >
                            A.I. Version
                        </button>
                        <button
                            className="btn btn--white"
                            // Correct JS for navigating to an external URL
                            onClick={() => window.location.href = "https://www.ourplanetourpeople.com/"}
                        >
                            Climate Change Version
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;