import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import UserService from '../../../services/user.service';
import { Link } from 'react-router-dom';

const user = AuthService.getCurrentUser();


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.handleDownloadCV = this.handleDownloadCV.bind(this);
        
        this.state = {
            successful: false,
            userApplicant: false,
            hrUser: false,
            admin: false,
            userDetails: [],
            userPersonalDetails: [],
            education: [],
            experience: [],
            application: [],
            cv: [],
            fileInfos: [],
            userReady: false,
            currentUser: { username: "" }
        };
      }
    
      componentDidMount() {
        this.retrieveUserDetails();

        if (user) {
            this.setState({
                currentUser: user,
                userApplicant: user.roles.includes("ROLE_USER"),
                hrUser: user.roles.includes("ROLE_MANAGEMENT"),
                admin: user.roles.includes("ROLE_ADMIN"),
            });
        }

        if (!user.roles.includes("ROLE_USER")) this.setState({ redirect: "/401" });
        this.setState({ currentUser: user.roles.includes("ROLE_USER"), userReady: true })
      }

      retrieveUserDetails(){
          UserService.getUserById(user.id)
          .then(response => {
            this.setState({
                userDetails: response,
                userPersonalDetails: response.userPersonalDetails,
                education: response.educations,
                experience: response.experiences,
                application: response.applications,
                cv: response.cv
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      handleDownloadCV(e) {
        e.preventDefault();
    
        this.setState({
          message: ""
          
        });

        UserService.downloadCV(user.id, this.state.cv.id)
        .then(function (response) {
            return response;
        })
        .then((file) => {
            var blob = new Blob([file], {type: "application/pdf"});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            var fileNameFromGetCVMethod = this.state.cv.name;
            link.download = fileNameFromGetCVMethod;
            link.click();
        })
        .catch(e => {
            console.log(e);
          });
      }

      
      
    render() {

         if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

       
        const { userDetails, userPersonalDetails, education, experience, application, cv } = this.state;


        return (
            <section className="account">

            {(this.state.userReady)?


                <div>
                    <section className="hrm-employer-detail-banner">
                        <div className="wrapper">
                            <div className="d-grid employer-grid">
                                <div className="employer-title">
                                </div>
                                {(userPersonalDetails) ?
                                    <div className="employer-name">
                                    <h4>{userPersonalDetails.fullName}</h4>
                                    </div>
                                    :(
                                        <div className="employer-name">
                                            <h4>It looks like you still haven't set your profile!</h4>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </section>
                    <section className="hrm-blog-single">
                        <div className="single blog">
                            <div className="wrapper">
                                <div className="d-grid grid-colunm-2">
                                    <div className="single-left">
                                        <div className="box-grid">
                                            <div className="single-left1 mb-0-imp">
                                                <h5 className="card-title">About Me </h5>
                                                {(userPersonalDetails) ?
                                                 <p className="">{userPersonalDetails.aboutMe} </p>
                                                :null}
                                            </div>
                                        </div>
                                        <div className="single-left-inner">
                                            <h5 className="card-title">Education</h5>
                                            {education &&
                                                education.map((education, index) => (
                                                    <div className="edu-grid" key={index}>
                                                        <h4 className="edu-title">{education.educationDegree} </h4>
                                                        <span>{education.educationType}</span>
                                                        <h5 className="edu-title">{education.educationInstitution}</h5>
                                                        <h5 className="edu-title">{education.educationCity}, {education.educationCountry}</h5>
                                                        <label>{education.educationStartDate}  -  {education.educationEndDate}</label>
                                                    </div>
                                            ))}
                                            <div>
                                                <Link to="/account/tab/education" className="add-edu-exp">Add education</Link>
                                            </div>
                                        </div>
                                        <div className="single-left-inner">
                                            <h5 className="card-title">Work experience</h5>
                                                {experience &&
                                                    experience.map((experience, index) => (
                                                    <div className="edu-grid" key={index}>
                                                        <h4 className="edu-title">{experience.positionName} </h4>
                                                        <span>{experience.companyName}</span>
                                                        <h5 className="edu-title">{experience.experienceCity}, {experience.experienceCountry}</h5>
                                                        <label>{experience.experienceStartDate} - {experience.experienceEndDate}</label>
                                                        <p>{experience.summary}</p>
                                                    </div>
                                             ))}
                                             <div>
                                                <Link to="/account/tab/experience" className="add-edu-exp">Add experience</Link>
                                            </div>
                                        </div>



                                        <div className="single-left-inner">
                                            <div className="flex__Flex-rh8osb-0 buzEKO">
                                                <div className="box__Box-sc-1yk08yy-0 grid__Grid-o3is72-0 jgDfnY applications-table__OverlayMask-d8hwcq-1 dEaaEz">
                                                    <h5 className="card-title">My applications </h5>
                                                </div>
                                            </div>
                                            {application &&
                                                application.map((application, index) => (
                                                <div key={index}>
                                                    <div className="d-grid employer-detail">
                                                        <div className="icon-employer">
                                                            <span className="fa fa-file-pdf-o"></span>
                                                        </div>
                                                        <div className="detail-employer">
                                                            <div className="upload-resume-candidate">
                                                                <h4>Position: {application.jobTitle}, {application.jobCity}</h4>
                                                                <p>Submited: {application.applicationDate}, status: {application.applicationStatus}</p>
                                                            </div>
                                                            {(application.applicationStatus !== 'withdrawn')?
                                                            <Link to={`/account/${user.id}/application/${application.applicationId}`}  className="add-edu-exp">
                                                                Withdraw
                                                            </Link>
                                                            :null}
                                                        </div>
                                                    </div>
                                                </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className="right-side-bar">
                                        <aside className="posts single-left-inner">
                                            <h5 className="card-title">Candidate details</h5>
                                            <div className="d-grid employer-detail">
                                                <div className="icon-employer">
                                                    <span className="fa fa-calendar"></span>
                                                </div>
                                                <div className="detail-employer">
                                                    <h4>Date of birth</h4>
                                                    {(userPersonalDetails) ?
                                                        <p>{userPersonalDetails.birthDate}</p>
                                                        :null}
                                                </div>
                                            </div>
                                            <div className="d-grid employer-detail">
                                                <div className="icon-employer">
                                                    <span className="fa fa-map-marker"></span>
                                                </div>
                                                <div className="detail-employer">
                                                    <h4>Address</h4>
                                                    {(userPersonalDetails) ?
                                                        <p>{userPersonalDetails.address}</p>
                                                        :null}
                                                </div>
                                            </div>
                                            
                                            <div className="d-grid employer-detail">
                                                <div className="icon-employer">
                                                    <span className="fa fa-envelope-open"></span>
                                                </div>
                                                <div className="detail-employer">
                                                    <h4>Email address</h4>
                                                    {(userPersonalDetails) ?
                                                        <p>{userDetails.email}</p>
                                                        :null}
                                                </div>
                                            </div>
                                            <div className="d-grid employer-detail">
                                                <div className="icon-employer">
                                                    <span className="fa fa-phone"></span>
                                                </div>
                                                <div className="detail-employer">
                                                    <h4>Contact number</h4>
                                                    {(userPersonalDetails) ?
                                                        <p>{userPersonalDetails.mobileNumber}</p>
                                                        :null}
                                                </div>
                                            </div>
                                            <div className="d-grid employer-detail">
                                                <div className="icon-employer">
                                                    <span className="fa fa-file-pdf-o"></span>
                                                </div>
                                                <div className="detail-employer">
                                                   {(cv) ?

                                                    <div className="upload-resume-candidate">
                                                        <h4>Resume</h4>
                                                        <a href="#url" onClick={this.handleDownloadCV} download>{cv.name}</a>
                                                    </div>
                                                    :(
                                                    <div className="upload-resume-candidate">
                                                        <h4>Resume</h4>
                                                        <Link to={"/account/tab/cv"} className="cv">
                                                                Upload
                                                        </Link>
                                                    </div>
                                                    )}

                                                </div>
                                            </div>
                                        </aside>
                                        {(userPersonalDetails) ?
                                            <div>
                                                <aside className="posts single-left-inner">
                                                    <Link to={"/account/edit/personal-details/" + userPersonalDetails.id}  className="follow" >Edit profile details</Link>
                                                </aside>
                                                <aside className="posts single-left-inner">
                                                    <Link to="/account/delete" className="follow">Delete profile</Link>
                                                </aside>
                                                <aside className="posts single-left-inner">
                                                {(userPersonalDetails.gender === 'female') ?
                                                        <img src="/images/job0.jpg" alt="" />
                                                    :(
                                                        <img src="/images/job7.jpg" alt="" />
                                                    )}
                                                    
                                                </aside>
                                                <aside className="posts single-left-inner">
                                                {(userPersonalDetails.gender === 'female') ?
                                                        <img src="/images/job3.jpg" alt="" />
                                                    :(
                                                        <img src="/images/job5.jpg" alt="" />
                                                    )}
                                                </aside>
                                            </div>
                                        :(
                                            <div>
                                                <div>
                                                    <aside className="posts single-left-inner">
                                                        <Link to="/account/tab/personal-details" className="follow">Complete your profile</Link>
                                                    </aside>
                                                </div>

                                                <div>
                                                <aside className="posts single-left-inner">
                                                    <Link to="/account/delete" className="follow">Delete account</Link>
                                                </aside>
                                                </div>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>:null }
                
            </section>
        );
    }
}
