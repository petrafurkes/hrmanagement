import React, { Component } from 'react';
import PublicService from '../../../services/public.service';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            jobs: []
        };
      }
    
      componentDidMount() {
        this.retrieveJobsDetailsActive();
      }
      retrieveJobsDetailsActive(){
          PublicService.getAllActiveJobs()
          .then(response => {
            this.setState({
                jobs: response
                
            });
          })
          .catch(e => {
            console.log(e);
          });
        }


    render(){

        const { jobs } = this.state;

        return (
            <section className="home">
                <section className="hrm-cover-3">
                    <div className="cover top-bottom">
                        <div className="wrapper">
                            <div className="middle-section text-center">
                                <div className="section-width">
                                    <h2>Starting from your Dream Jobs</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hrm-companies-20">
                    <div className="companies20">
                        <h3 className="heading">Explore open positions</h3>
                            <div className="wrapper">
                                <div className="companies20-content">
                                    <div className="companies-wrapper">
                                        <div className="owl-carousel owl-theme">

                                        {jobs &&
                                            jobs.map((jobs, index) => (
                                            <div className="item" data-id={jobs.jobId} key={index}>
                                                <Link to={`/job/${jobs.jobId}`}>{jobs.jobTitle} </Link>
                                                    <p>{jobs.jobCategory}</p>
                                                    <p>{jobs.jobCity}</p>
                                                <span className="pos-icon">
                                                    <span className="fa fa-laptop"></span>
                                                </span>
                                            </div>
                                            ))}
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>

                <section className="hrm-covers-14">
                    <div id="covers14-block">
                        <div className="wrapper">
                            <div className="covers14-text">
                                <h4>Come innovate with us </h4>
                                <p>Join our diverse group of innovators, working together to solve industries’ and organizations’ most challenging problems. Use leading-edge technologies and strategies to reinvent the way every job is done and help improve the way the world works and lives.</p>
                                <a className="actionbg1" href="/about">About us</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hrm-price-2">
                    <div className="price-main">
                        <h3 className="heading">Featured Jobs</h3>
                        <div className="wrapper">
                            <div className="pricing-style-hrms">
                                <div className="full text-center">
                                </div>
                                <div id="monthly" className="">
                                    <div className="pricing-chart">
                                    {jobs &&
                                        jobs.map((jobs, index) => (
                                        <div className="price-box btn-layout bt6" data-id={jobs.jobId} key={index}>
                                            <div className="grid grid-column-2">
                                                <div className="column1">
                                                        <img src="/images/job2.png" width="60px" alt=""
                                                            className="img-responsive" />
                                                    <div className="job-info">
                                                    <h6 className="pricehead"><Link to={`/job/${jobs.jobId}`}>{jobs.jobTitle}</Link>
                                                        </h6>
                                                        <ul className="location">
                                                            <li><span className="fa fa-map-marker"></span> {jobs.jobCity}</li>
                                                            <li><span className="fa fa-briefcase"></span> {jobs.jobCategory}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="column2">
                                                    <p><>Type :</>{jobs.contractType}</p>
                                                    <p><>Closing date :</>{jobs.jobDateExpiration}</p>
                                                </div>
                                                <div className="column3 text-right">
                                                <Link to={`/job/${jobs.jobId}`} className="actionbg">Apply Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }

}