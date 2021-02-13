import React, { Component } from 'react';

export default class Contact extends Component {

    render() {

        return (

   
        <section className="contact">
            <section className="hrm-inner-banner">
                <div className="wrapper">
                </div>
            </section>
            <div className="hrm-contacts-5">
                <div className="hrm-contacts-5-grid-main">
                    <div className="hrm-contacts-5-grid">
                        <div className="contacts-sub-5">
                            <img src="/images/google.JPG" className="img-responsive5" alt=""/> 
                        </div>
                        <div className="map-content-5">
                            <input id="tab1" type="radio" name="tabs" />
                            <label className="tabtle" htmlFor="tab1">Ireland</label>

                            <input id="tab2" type="radio" name="tabs" />
                            <label className="tabtle" htmlFor="tab2">Australia</label>

                            <input id="tab3" type="radio" name="tabs" />
                            <label className="tabtle" htmlFor="tab3">Croatia</label>

                            <input id="tab4" type="radio" name="tabs" />
                            <label className="tabtle" htmlFor="tab4">UK</label>

                            <section id="content1" className="tab-content">
                                <div className="d-grid grid-col-4">
                                    <div className="service-col-4 contact">
                                        <h6>Address</h6>
                                        <p>5 Burlington Rd, Dublin, Ireland</p>

                                    </div>
                                    <div className="service-col-4 contact">
                                        <h6>Email</h6>
                                        <a href="mailto:HR@mail.com" className="link1">HR@mail.com</a>
                                        <a href="mailto:info@mail.com" className="link1">info@mail.com</a>

                                    </div>
                                    <div className="service-col-4 contact">
                                        <h6>Phone</h6>
                                        <a href="tel:+353 1444 555" className="link1">+353 1444 555</a>
                                        <a href="tel:+353 1444 556" className="link1">+353 1444 556</a>

                                    </div>
                                    <div className="service-col-4">
                                        <a href="/coming-soon" className="btn button-style">Contact us</a>
                                    </div>
                                </div>
                            </section>
                            <section id="content2" className="tab-content">
                                <div className="d-grid grid-col-4">
                                    <div className="service-col-4">
                                        <h6>Address</h6>
                                        <p>Street 25, Sydney, Australia</p>
                                    </div>
                                    <div className="service-col-4">
                                        <h6>Email</h6>
                                        <a href="mailto:HR@mail.com" className="link1">HR@mail.com</a>
                                        <a href="mailto:info@mail.com" className="link1">info@mail.com</a>
                                    </div>
                                    <div className="service-col-4">
                                        <h6>Phone</h6>
                                        <a href="tel:+61 8444 555" className="link1">+61 8444 555</a>
                                        <a href="tel:+61 8444 556" className="link1">+61 8444 556</a>
                                    </div>
                                    <div className="service-col-4">
                                        <a href="/coming-soon" style={{maxWidth: '150px'}} className="btn button-style">Contact us</a>
                                    </div>
                                </div>

                            </section>
                            <section id="content3" className="tab-content">
                                <div className="d-grid grid-col-4">
                                    <div className="service-col-4">
                                        <h6>Address</h6>
                                        <p>Ulica 25, Zagreb, Croatia</p>

                                    </div>
                                    <div className="service-col-4">
                                        <h6>Email</h6>
                                        <a href="mailto:HR@mail.com" className="link1">HR@mail.com</a>
                                        <a href="mailto:info@mail.com" className="link1">info@mail.com</a>
                                    </div>
                                    <div className="service-col-4">
                                        <h6>Phone</h6>
                                        <a href="tel:+353(1) 8444 555" className="link1">+353 1 8444 555</a>
                                        <a href="tel:+353(1) 8444 556" className="link1">+353 1 8444 555</a>
                                    </div>
                                    <div className="service-col-4">
                                        <a href="/coming-soon" style={{maxWidth: '150px'}} className="btn button-style">Contact us</a>
                                    </div>
                                </div>

                            </section>

                            <section id="content4" className="tab-content">
                                <div className="d-grid grid-col-4">
                                    <div className="service-col-4">
                                        <h6>Address</h6>
                                        <p>Street 25, London, UK.</p>

                                    </div>
                                    <div className="service-col-4">
                                        <h6>Email</h6>
                                        <a href="mailto:HR@mail.com" className="link1">HR@mail.com</a>
                                        <a href="mailto:info@mail.com" className="link1">info@mail.com</a>
                                    </div>
                                    <div className="service-col-4">
                                        <h6>Phone</h6>
                                        <a href="tel:+44(1) 8444 555" className="link1">+44 1 8444 555</a>
                                        <a href="tel:+44(1) 8444 556" className="link1">+44 1 8444 555</a>
                                    </div>
                                    <div className="service-col-4">
                                        <a href="/coming-soon" style={{maxWidth: '150px'}} className="btn button-style">Contact us</a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <section className="hrm-form-41">
                <div className="hrm-form-41-mian">
                    <div className="wrapper">
                        <div className="form-inner-cont">
                        </div>
                    </div>
                </div>
	        </section>
        </section>
    )
}

}