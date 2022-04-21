import React from 'react';
import Hom from '../images/electricity2.jpg';
import Nav from './Header';

function Home() {

    return (
        <div>
            <Nav/>
            <div style={{fontFamily: "Arial"}}>
                <img src={Hom} width="100%" height="530px" className="home"></img>


                <div className="content w-100" style={{
                    position: "absolute", bottom: "-4%", backgroundColor: "rgba(0, 0, 0,0.3)",
                    color: "#F8FBFA", padding: "20px", height: "87%"
                }}>
                    <div style={{position: "relative", top: "30%", textAlign: "center"}}>
                        <h2><b>WELCOME to Energy Electricity Billing System!</b></h2>
                        <p>Start your journey with us...!</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
