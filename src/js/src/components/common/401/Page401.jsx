import React, { Component } from 'react';

export default class Page401 extends Component {


    render() {
       
        return (
            <section className="401">
                <section className="hrm-error-page">
                    <div className="covers-main">
                        <div className="wrapper">
                            <div className="d-gird">
                                <div className="left-grid-widget text-center">
                                    <h1>
                                        <a href="index.html" class="logo">HR Management</a>
                                    </h1>
                                    <p className="page-detail">Unauthorized</p>
                                </div>
                                <div className="main-cover">
                                    <h4 className="cover-para">401</h4>
                                    <p className="form-text">Sorry, you are not allowed to access this site.</p>
                                </div>
                                <a href="/home" className="back-button">Back to Home</a>
                            </div>
                        </div>
                    </div>
                </section>
               
            </section>
        )
    }

}