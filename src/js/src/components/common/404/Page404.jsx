import React, { Component } from 'react';

export default class Page404 extends Component {


    render() {
       
        return (
            <section className="404">
                <section className="hrm-error-page">
                    <div className="covers-main">
                        <div className="wrapper">
                            <div className="d-gird">
                                <div className="left-grid-widget text-center">
                                    <h1>
                                        <a href="index.html" class="logo">HR Management</a>
                                    </h1>
                                    <p className="page-detail">Not found</p>
                                </div>
                                <div className="main-cover">
                                    <h4 className="cover-para">404</h4>
                                    <p className="form-text">Sorry, there is nothing to see.</p>
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