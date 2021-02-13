import React, { Component } from 'react';
import AuthService from "../../../services/auth.service";
import PublicService from "../../../services/public.service";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";

const user = AuthService.getCurrentUser();

export default class HRUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userReady: false,
            sucessful: false,
            userApplicant: false,
            hrUser: false,
            admin: false,
            currentUser: { username: "" },
            jobsActive: [],
            jobsExpired: [],
            applications: [],
            applicationId: "",
            userDetails: []
        };
    }

    componentDidMount() {
        this.retrieveActiveJobsDetails();
        this.retrieveExpiredJobsDetails();
        

        if (user) {
            this.setState({
                currentUser: user,
                userApplicant: user.roles.includes("ROLE_USER"),
                hrUser: user.roles.includes("ROLE_MANAGEMENT"),
                admin: user.roles.includes("ROLE_ADMIN"),
            });
        }

        if (!user.roles.includes("ROLE_MANAGEMENT")) this.setState({ redirect: "/401" });
        this.setState({ currentUser: user, userReady: true })

    }

    retrieveActiveJobsDetails(){
        PublicService.getAllActiveJobs()
        .then(response => {
          this.setState({
              jobsActive: response,
              jobId: response.jobId,
              applications: response.applications,
          });
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }

    retrieveExpiredJobsDetails(){
        PublicService.getAllExpiredJobs()
        .then(res => {
          this.setState({
              jobsExpired: res,
              jobId: res.jobId,
              applications: res.applications,
          });
        })
        .catch(e => {
          console.log(e);
        });
    }



    render() {

        const { currentUser, jobsActive, jobsExpired } = this.state;

        

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        return (
            <section className="about">
                 {(this.state.userReady) ?
                <div>

                    <section className="hrm-inner-banner">
                        <div className="wrapper">
                        </div>
                    </section>
                    <section className="hrm-breadcrumns">
                        <div className="wrapper">
                        <ul>
                            <li><a href="index.html">Home</a> <span className="fa fa-angle-double-right"></span></li>
                            <li>HR department</li>
                        </ul>
                        </div>
                    </section>

                    <section className="hrm-features-photo-7">
                        <div className="hrm-features-photo-7_sur">
                            <h3 className="heading"> Hello {currentUser.username}!</h3>
                                <div className="hrm-features-photo-7_sur-1">
                                    <Link to="/management/job/add" className="btn-add-job">Publish new job</Link>
                                </div>
                            <div className="wrapper">
                                <div className="hrm-features-photo-7_top-1">
                                    <div className="hrm-features-photo-7_top-left">
                                        <h4>Active jobs</h4>
                                        {(jobsActive) ?
                                        <div>
                                            {jobsActive &&
                                                jobsActive.map((jobsActive, index) => (
                                                <div className="price-box btn-layout bt6" data-id={jobsActive.jobId} key={index}>
                                                    <div className="grid grid-column-2">
                                                        <h5>Position: {jobsActive.jobTitle} (id: {jobsActive.jobId})</h5>
                                                            <ul className="location">
                                                                <li> Category: {jobsActive.jobCategory}</li>
                                                                <li> City: {jobsActive.jobCity}</li>
                                                                <p><>Contract :</>{jobsActive.contractType}</p>
                                                                <p><>Closing date :</>{jobsActive.jobDateExpiration}, open since: {jobsActive.jobDateCreated}</p>
                                                            </ul>
                                                            <div>
                                                                <Link to={`/job/${jobsActive.jobId}`} className="btn-candidate">
                                                                    Details
                                                                </Link>
                                                                <Link to={`/management/edit/job/${jobsActive.jobId}`} className="btn-candidate">
                                                                    Edit
                                                                </Link>
                                                                <Link to={`/job/${jobsActive.jobId}`}className="btn-candidate">
                                                                    Delete
                                                                </Link>
                                                            </div>
                                                        <div className="column2">
                                                        </div>
                                                    </div>
                                                </div>
                                            ))} 
                                        </div>
                                        :(<p>No jobs found</p>)}


                                    </div>
                                    <div className="hrm-features-photo-7_top-right">
                                        <h4>Active job's applications</h4>
                                        {(jobsActive) ?
                                        <div>
                                            {jobsActive &&
                                                jobsActive.map((jobsActive, index) => (
                                                <div className="price-box btn-layout bt6" data-id={jobsActive.jobId} key={index}>
                                                    <div className="grid grid-column-2">
                                                        <h5>Position: {jobsActive.jobTitle} (id: {jobsActive.jobId})</h5>
                                                        {jobsActive.applications &&
                                                            jobsActive.applications.map((applications, index) => (
                                                                <div className="application-hrUser-profile" data-id={applications.applicationId} key={index}> 
                                                                    <ul className="location">
                                                                        <li> Application Id: {applications.applicationId}</li>
                                                                        <li> Application Date: {applications.applicationDate}</li>
                                                                        <p><>Status: </>{applications.applicationStatus}</p>
                                                                        <li> Applicant: {applications.userFullName}</li>
                                                                        <li> Email: {applications.userEmail}</li>
                                                                        <li> Contact: {applications.userMobileNumber}</li>
                                                                        <Link to={`/management/user-applicant/${applications.applicantId}`} className="btn-candidate">
                                                                            Applicant profile
                                                                        </Link>
                                                                        {(applications.applicationStatus !== 'withdrawn')?
                                                                        <Link to={`/management/${applications.applicantId}/application/${applications.applicationId}`} className="btn-candidate">
                                                                            Hiring process
                                                                        </Link>
                                                                        :null}
                                                                    </ul>
                                                                </div>
                                                                ))} 
                                                        <div className="column2">
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}  
                                        </div>
                                        :(<p>No jobs found</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
                    <section className="hrm-features-4">
                        <div id="features4-block">
                            <h3 className="heading"> How It Works</h3>
                            <div className="wrapper">
                                <div className="features4-grids d-grid">
                                    <div className="features4-grid">
                                        <div className="icon1">
                                            <span className="fa text-center fa-star"></span>
                                        </div>
                                        <h5><a href="/management/job/add">Add new job</a></h5>
                                        <p>Donec sed tempus enim, Pelrisus. Pellen tesqu euismod massa a quam viverra et.</p>
                                    </div>
                                    <div className="features4-grid">
                                        <div className="icon2">
                                            <span className="fa text-center fa-user"></span>
                                        </div>
                                        <h5><a href="/coming-soon">Register new employee</a></h5>
                                        <p>Donec sed tempus enim, Pelrisus. Pellen tesqu euismod massa a quam viverra et.</p>
                                    </div>
                                    <div className="features4-grid">
                                        <div className="icon3">
                                            <span className="fa text-center fa-graduation-cap"></span>
                                        </div>
                                        <h5><a href="/coming-soon">Learning & development</a></h5>
                                        <p>Donec sed tempus enim, Pelrisus. Pellen tesqu euismod massa a quam viverra et.</p>
                                    </div>
                                    <div className="features4-grid">
                                        <div className="icon4">
                                            <span className="fa text-center fa-paper-plane"></span>
                                        </div>
                                        <h5><a href="/coming-soon">Payroll</a></h5>
                                        <p>Donec sed tempus enim, Pelrisus. Pellen tesqu euismod massa a quam viverra et.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="hrm-counter-top-6">
                        
                        <section className="hrm-features-photo-7">
                            <div className="hrm-features-photo-7_sur">
                                <div className="wrapper">
                                    <div className="hrm-features-photo-7_top-1">
                                        <div className="hrm-features-photo-7_top-left">
                                            <h4>Expired jobs</h4>
                                            {(jobsExpired) ?
                                                <div>
                                                {jobsExpired &&
                                                    jobsExpired.map((jobsExpired, index) => (
                                                    <div className="price-box btn-layout bt6" data-id={jobsExpired.jobId} key={index}>
                                                        <div className="grid grid-column-2">
                                                            <h5>Position: {jobsExpired.jobTitle} (id: {jobsExpired.jobId})</h5>
                                                                <ul className="location">
                                                                    <li> Category: {jobsExpired.jobCategory}</li>
                                                                    <li> City: {jobsExpired.jobCity}</li>
                                                                    <p><>Contract :</>{jobsExpired.contractType}</p>
                                                                    <p><>Closing date :</>{jobsExpired.jobDateExpiration}, open since: {jobsExpired.jobDateCreated}</p>
                                                                </ul>
                                                                <div>
                                                                    <Link to={`/job/${jobsExpired.jobId}`} className="btn-candidate">
                                                                        Details
                                                                    </Link>
                                                                    <Link to={`/management/edit/job/${jobsExpired.jobId}`} className="btn-candidate">
                                                                        Edit
                                                                    </Link>
                                                                    <Link to={`/job/${jobsExpired.jobId}`}className="btn-candidate">
                                                                    Delete
                                                                </Link>
                                                                </div>
                                                            <div className="column2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))} 
                                                </div>
                                            :(<p>No jobs found</p>)} 
                                        </div>
                                        <div className="hrm-features-photo-7_top-right">
                                            <h4>Applications</h4>
                                            {(jobsExpired) ?
                                                <div>
                                                {jobsExpired &&
                                                    jobsExpired.map((jobsExpired, index) => (
                                                    <div className="price-box btn-layout bt6" data-id={jobsExpired.jobId} key={index}>
                                                        <div className="grid grid-column-2">
                                                            <h5>Position: {jobsExpired.jobTitle} (id: {jobsExpired.jobId})</h5>
                                                            {jobsExpired.applications &&
                                                                jobsExpired.applications.map((applications, index) => (
                                                                    <div data-id={applications.applicationId} key={index}> 
                                                                        <ul className="location">
                                                                            <li> Application Id: {applications.applicationId}</li>
                                                                            <li> Application Date: {applications.applicationDate}</li>
                                                                            <p><>Status: </>{applications.applicationStatus}</p>
                                                                            <li> Applicant: {applications.userFullName}</li>
                                                                            <li> Email: {applications.userEmail}</li>
                                                                            <li> Contact: {applications.userMobileNumber}</li>
                                                                            <Link to={`/management/user-applicant/${applications.applicantId}`} className="btn-candidate">
                                                                                Applicant profile
                                                                            </Link>
                                                                            {(applications.applicationStatus !== 'withdrawn')?
                                                                            <Link to={`/management/${applications.applicantId}/application/${applications.applicationId}`} className="btn-candidate">
                                                                                Hiring process
                                                                            </Link>
                                                                            :null}
                                                                        </ul>
                                                                    </div>
                                                                    ))} 
                                                            <div className="column2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}  
                                            </div>
                                            :null} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        
                        <section id="counter-6-inf-block" className="counter-main">
                            <div className="wrapper-full-gd">
                                <div className="d-grid align-counter-6-inf-cols">
                                    <div className="counter-6-inf-left second">
                                    </div>
                                    <div className="counter-6-inf-right">
                                        <div className="d-grid grid-col-2">
                                            <div className="specification">
                                                <span className="fa fa-user-plus"></span>
                                                <h6>Register new employee</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper rhoncus imperdiet. Vivamus pellentesque convallis velit id blandit.</p>
                                            </div>
                                            <div className="specification">
                                                <span className="fa fa-graduation-cap"></span>
                                                <h6>Learning & development</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper rhoncus imperdiet. Vivamus pellentesque convallis velit id blandit.</p>
                                            </div>
                                            <div className="specification spec-gap">
                                                <span className="fa fa-user"></span>
                                                <h6>Traveling on business</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper rhoncus imperdiet. Vivamus pellentesque convallis velit id blandit.</p>
                                            </div>
                                            <div className="specification spec-gap">
                                                <span className="fa fa-money"></span>
                                                <h6>Payroll</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper rhoncus imperdiet. Vivamus pellentesque convallis velit id blandit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="hrm-call-to-action-6">
                        <div className="call-vv-action">
                        <div className="wrapper">
                            
                        </div>

                        </div>
                    </section>
                    <section className="hrm-customers-4">
                        
                    </section>
                </div>: null}
            </section>
        )
    }

}