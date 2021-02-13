import React, { Component } from 'react';
import PublicService from "../../../../services/public.service";
import AuthService from "../../../../services/auth.service";
import UserService from "../../../../services/user.service";
import ManagementService from "../../../../services/management.service";
import { Link } from 'react-router-dom';




const user = AuthService.getCurrentUser();

export default class JobSinglePage extends Component {

    constructor(props) {
        super(props);

        this.handleApplication = this.handleApplication.bind(this);
        this.deleteJob = this.deleteJob.bind(this);

        this.state = {
            successful: false,
            jobDetails: [],
            userApplicant: false,
            hrUser: false,
            admin: false,
            currentUser: undefined,
            application: []
            
        };
      }
    
      componentDidMount() {
        this.retrieveJobDetails();
        if (user) {
            this.setState({
                currentUser: user,
                userApplicant: user.roles.includes("ROLE_USER"),
                hrUser: user.roles.includes("ROLE_MANAGEMENT"),
                admin: user.roles.includes("ROLE_ADMIN"),
            });
        }
      }
      retrieveJobDetails(){
          PublicService.getJobById(this.props.match.params.id)
          .then(response => {
            this.setState({
              jobDetails: response
                
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

    handleApplication(p) {
        p.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
        UserService.submittApplication(
            this.props.match.params.id
        
        ).then(
        response => {
            this.setState({
            successful: true,
            application: response
            });
            this.props.history.push("/user/profile");
              window.location.reload();
        },
        
        error => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({
            successful: false,
            message: resMessage
            });
        }
        );
    }


    deleteJob(p) {
        p.preventDefault();
    
        this.setState({
          message: "Job position has been deleted!",
          successful: false
        });
    
       
          ManagementService.deleteJob(this.props.match.params.id)
          .then(
            response => {
              this.setState({
                successful: true,
                message: response
              });
              this.props.history.push("/management/hruser");
              window.location.reload();
              
            })
            .catch(e => {
              console.log(e);
            });
        }
      
    render() {

      console.log(this.props.match.params.id)

        const { jobDetails, hrUser, userApplicant } = this.state;
        
          
        return (
            <section className="jobSinglePage">
                <div>
                    <section className="hrm-job-detail-banner">
                        <div className="wrapper">
                            <div className="d-grid job-grid">
                                <div className="job-title">
                                    <label>Job opening</label>
                                    <h3>{jobDetails.jobTitle}</h3>
                                    <ul className="info">
                                        <li><span className="fa fa-map-marker"></span> {jobDetails.jobCity}</li>
                                        <li><span className="fa fa-hand-o-right"></span> {jobDetails.contractType}</li>
                                        <li><span className="fa fa-dollar"></span> {jobDetails.salary}/ monthly</li>
                                    </ul>
                                </div>
                                {(userApplicant) ?
                                <div className="job-apply">
                                    <button 
                                    className="apply-button"
                                    onClick={this.handleApplication}
                                    variant="success" 
                                    type="submit" 
                                    > Apply now</button>
                                </div>
                                :null}
                            </div>
                        </div>
                    </section>
                    <section className="hrm-blog-single no-padding">
                        <div className="single blog">
                            <div className="wrapper">
                                <div className="d-grid grid-colunm-2">
                                    <div className="single-left">
                                        <div className="single-left-inner">
                                        <h5 className="card-title">Job information </h5>
                                            <div className="d-grid main-grid">
                                                <div className="job-info1">
                                                    <span className="fa fa-check-square-o"></span>
                                                    <div className="job-info-grid">
                                                        <h4>Category</h4>
                                                        <p>{jobDetails.jobCategory}</p>
                                                    </div>
                                                </div>
                                                <div className="job-info1">
                                                    <span className="fa fa-check-square-o"></span>
                                                    <div className="job-info-grid">
                                                        <h4>Posted on</h4>
                                                        <p>{jobDetails.jobDateCreated}</p>
                                                    </div>
                                                </div>
                                                <div className="job-info1">
                                                    <span className="fa fa-check-square-o"></span>
                                                    <div className="job-info-grid">
                                                        <h4>Job experience</h4>
                                                        <p>1 - 5 years of exp</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-grid">
                                            <div className="single-left1">
                                                <h5 className="card-title">Job description </h5>
                                                <p className="">{jobDetails.jobDescription} </p>
                                            </div>
                                            <div className="single-left1">
                                                <h5 className="card-title">Responsibilities: </h5>
                                                <ul className="details-list">
                                                    <li><p className="">{jobDetails.jobResponsibilities} </p></li>
                                                </ul>
                                            </div>
                                            <div className="single-left1">
                                                <h5 className="card-title">What we are looking for: </h5>
                                                <ul className="details-list">
                                                    <li><p className="">{jobDetails.jobRequirements} </p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right-side-bar">
                                        <div className="app-deadline">
                                            <div className="short-detail-icon">
                                                <span className="fa fa-clock-o"></span>
                                            </div>
                                            <div className="short-detail-meta">
                                                <small>Deadline</small>
                                                <strong>{jobDetails.jobDateExpiration}</strong>
                                            </div>
                                            <span className="ab-iocn"/><span className="fa fa-clock-o"></span>
                                        </div>
                                        {(hrUser) ?
                                        <aside className="posts single-left-inner">
                                        <div>
                                            <Link to={"/management/edit/job/" + jobDetails.jobId} 
                                                className="btn linkEdit" >Edit job details</Link>
                                            <button onClick={this.deleteJob}
                                                className="btn candidate">Delete job</button>
                                        </div>
                                        </aside>
                                        :null}
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job5.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job7.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job13.jpg" alt="" />
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}
