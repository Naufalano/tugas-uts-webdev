import React from "react";
import "./Body.css";

function Body() {
    return (
        <>
            <div className="body">
                <div className="mainbody">
                    <div className="wrapper">
                        <div className="slider">
                            <img id="slide-1" src="src/assets/lokal/amara.jpg" alt="Kayu Amara" />
                            <img id="slide-2" src="src/assets/lokal/ebony.jpg" alt="Kayu Ebony" />
                            <img id="slide-3" src="src/assets/lokal/jatilokal.jpg" alt="Kayu Jati Lokal" />
                            <img id="slide-4" src="src/assets/lokal/jatiperhutani.jpg" alt="Kayu Jati Perhutani" />
                            <img id="slide-5" src="src/assets/lokal/mahoni.jpg" alt="Kayu Mahoni" />
                        </div>
                        <div className="slide-nav">
                            <a href="#slide-1"></a>
                            <a href="#slide-2"></a>
                            <a href="#slide-3"></a>
                            <a href="#slide-4"></a>
                            <a href="#slide-5"></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body;