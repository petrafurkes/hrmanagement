import React, { Component } from 'react';
import PublicService from '../../../services/public.service';
import { Link } from 'react-router-dom';



export default class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            message: ""
        };
      }
    

      componentDidMount() {
        this.retrieveJobsDetails();
      }
      retrieveJobsDetails(){
          PublicService.getAllActiveJobs()
          .then(response => {
            this.setState({
                jobs: response,
                jobId: response.jobId
                
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

    


    render(){

        const { jobs } = this.state;

        return (
            <section className="jobs">
                <section className="hrm-inner-banner">
                    <div className="wrapper">
                    </div>
                </section>
                <section className="hrm-breadcrumns">
                    <div className="wrapper">
                        <ul>
                            <li><a href="index.html">Home</a> <span className="fa fa-angle-double-right"></span></li>
                            <li>Pages <span className="fa fa-angle-double-right"></span></li>
                            <li>Jobs page</li>
                        </ul>
                    </div>
                </section>
                <section className="hrm-blog-single no-padding">
                    <div className="single blog">
                        <div className="wrapper">
                            <div className="d-grid grid-colunm-2">
                                <div className="single-left">
                                    <h5 className="card-title">Featured Jobs </h5>
                                    <div className="hrm-price-2">
                                        {jobs &&
                                            jobs.map((jobs, index) => (
                                            <div className="price-box btn-layout bt6" data-id={jobs.jobId} key={index}>
                                                <div className="grid grid-column-2">
                                                    <div className="column1">
                                                            <img src="/images/job4.png" width="60px" alt=""
                                                                className="img-responsive" />
                                                        <div className="job-info">
                                                            <h6 className="pricehead"><Link to={`/job/${jobs.jobId}`}>{jobs.jobTitle} </Link></h6>
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
                                                        <Link to={`/job/${jobs.jobId}`} className="actionbg">
                                                            Apply Now
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="right-side-bar">
                                    <aside className="posts single-left-inner">
                                        <img src="/images/job5.jpg" alt="" />
                                    </aside>
                                    <aside className="posts single-left-inner">
                                        <img src="/images/job7.jpg" alt="" />
                                    </aside>
                                    <aside className="posts single-left-inner">
                                        <img src="/images/job8.jpg" alt="" />
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }

}