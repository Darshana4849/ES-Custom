import React from "react";

const Footer = React.forwardRef((props, ref) => {
    return (    
        <section className="footer" ref={ref}>
            <div className="box-container">
                <div className="box">
                    <h3>contact info</h3>
                    <a href="#"> <i className="fas fa-phone"></i> +9477 726 0247 </a>
                    <a href="#"> <i className="fas fa-phone"></i> +9477 519 3445 </a>
                    <a href="#"> <i className="fas fa-envelope"></i> escustoms@gmail.com </a>
                    <a href="#"> <i className="fas fa-envelope"></i> escustoms12@gmail.com </a>
                    <a href="#"> <i className="fas fa-map-marker-alt"></i> NO 21/ Main Street, Ja-Ela </a>
                </div>

                <div className="box">
                    <h3>follow us</h3>
                    <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
                    <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
                    <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
                    <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
                </div>
            </div>

            <div className="credit"> 
                created by <span>KreativMinds Designers</span> | all rights reserved 
            </div>
        </section>
    );
});

export default Footer;
