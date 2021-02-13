import React, { Component } from "react";
import './components/css/style.css';


import {Home, About, Jobs, Profile, RegisterUser,
        RegisterHRUser, RegisterNewEmployee, AddEmploymentDetails,
        Contact, Login, HRUser, AddPersonalDetails, 
        AddEducation, AddExperience, Admin, AddJob, 
        JobSingle, AddCV, EditPersonalDetails,
        DisplayEditEducations, EditSingleEducation, 
        DisplayEditExperience, EditCV, DeleteMessage, 
        EditJob, ComingSoon, UAProfile, DeleteEducation, 
        DeleteExperience, Page401, Page404, 
        EditSingleExperience, HiringProcess, WithdrawApplication} from './components/common';
import { Switch, Route } from 'react-router-dom';
import AuthService from "./services/auth.service";


class App extends Component {


    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            userApplicant: false,
            hrUser: false,
            admin: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                userApplicant: user.roles.includes("ROLE_USER"),
                hrUser: user.roles.includes("ROLE_MANAGEMENT"),
                admin: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, userApplicant, hrUser, admin } = this.state;

        return (
            <div className="application">
                <div className="hrm-headers-9">
                    <header>
                        <div className="wrapper">
                            <div className="header">
                                <div>
                                    <h1>
                                        <a href="/"  className="logo">HR management</a>
                                    </h1>
                                </div>



                                <div className="bottom-menu-content">
                                    <input type="checkbox" id="nav" />
                                    <label htmlFor="nav" className="menu-bar"></label>
                                    <nav>

                                        <ul className="menu">
                                            <li><a href="/" className="link-nav">Home</a></li>
                                            <li><a href="/about" className="link-nav">About</a></li>
                                            <li><a href="/jobs" className="link-nav">Open positions</a></li>
                                        
                                            
                                            {userApplicant && (
                                                <li>
                                                    <a href="/user/profile" className="link-nav">
                                                        {currentUser.username}
                                                    </a>
                                                </li>
                                            )}
                                            <li><a href="/contact" className="link-nav">Contact</a></li>

                                            {/* management board */}
                                            {hrUser && (
                                                <li>
                                                    <a href="/management/hruser"  class="link-nav dropdown-toggle">Management Board - {currentUser.username}</a>
                                                    <input type="checkbox" id="drop-2" />
                                                    <ul class="first-dropdwon">
                                                        <li><a href="/management/register-new-employee">Register new employee</a></li>
                                                        <li><a href="/management/employee/add-employment-details">Add employment details</a></li>
                                                        {/* <li><a href="job-single.html">Job detail</a></li>
                                                        <li><a href="team.html">Employers</a></li>
                                                        <li><a href="team-single.html">Employers detail</a></li>
                                                        <li><a href="candidate.html">Candidates</a></li>
                                                        <li><a href="candidate-single.html">Candidates detail</a></li>
                                                        <li><a href="timeline.html">Timeline</a></li>
                                                        <li><a href="faq.html">Faq page</a></li>
                                                        <li><a href="coming-soon.html">Coming soon</a></li>
                                                        <li><a href="error.html">404 - error</a></li>
                                                        <li><a href="search-results.html">Search results</a></li>
                                                        <li><a href="email-template.html">Email template</a></li> */}
                                                    </ul>
                                                </li>
                                            )}

                                            {/* admin board */}
                                            {admin && (
                                                <li>
                                                    <a href="/admin" className="link-nav">
                                                        Admin Board - {currentUser.username}
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                        
                                        {currentUser ? (
                                            <ul className="menu">
                                                <li>
                                                    <a href="/login" className="link-nav" onClick={this.logOut}>
                                                        LogOut
                                                    </a>
                                                </li>
                                            </ul>

                                        ) : (

                                            <ul className="menu">
                                                <li>
                                                    <a href="/user/register" className="link-nav">
                                                        Sign Up
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/login" className="jobs">
                                                        Login
                                                    </a>
                                                </li>
                                            </ul>

                                        )}

                                    </nav>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <Switch>
                
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route path="/about" component={About}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/user/register" component={RegisterUser} />
                    <Route path="/contact" component={Contact}/>
                    <Route exact path="/jobs" component={Jobs}/>
                    <Route path="/job/:id" component={JobSingle}/>
                    <Route path="/management/job/add" component={AddJob} />
                    <Route exact path="/user/profile" component={Profile} />
                    <Route exact path="/account/tab/personal-details" component={AddPersonalDetails} />
                    <Route exact path="/account/tab/education" component={AddEducation} />
                    <Route exact path="/account/tab/experience" component={AddExperience} />
                    <Route exact path="/account/tab/cv" component={AddCV} />
                    <Route exact path="/account/edit/cv" component={EditCV} />
                    <Route exact path="/account/edit/personal-details/:id" component={EditPersonalDetails} />
                    <Route exact path="/account/edit/education" component={DisplayEditEducations} />
                    <Route exact path="/account/edit/education/:id" component={EditSingleEducation} />
                    <Route exact path="/account/edit/experience" component={DisplayEditExperience} />
                    <Route exact path="/account/edit/experience/:id" component={EditSingleExperience} />
                    <Route exact path="/account/delete/education/:educationId" component={DeleteEducation} />
                    <Route exact path="/account/delete/experience/:experienceId" component={DeleteExperience} />
                    <Route exact path="/account/:userId/application/:applicationId" component={WithdrawApplication} />
                    <Route exact path="/management/edit/job/:id" component={EditJob} />
                    <Route exact path="/account/delete" component={DeleteMessage} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/hruser/register" component={RegisterHRUser} />
                    <Route path="/management/hruser" component={HRUser}/>
                    <Route exact path="/management/user-applicant/:id" component={UAProfile} />
                    <Route exact path="/management/:applicantId/application/:applicationId" component={HiringProcess} />
                    <Route exact path="/management/register-new-employee" component={RegisterNewEmployee} />
                    <Route exact path="/management/employee/add-employment-details" component={AddEmploymentDetails} />


                    <Route exact path="/401" component={Page401}/>
                    <Route exact path="/coming-soon" component={ComingSoon} />
                    <Route exact path="/*" component={Page404}/>
                   
                </Switch>

                <div className="hrm-footer-17">
                    <div className="footer17_sur">
                        <div className="wrapper">
                            <div className="footer17-top">
                                <div className="footer17-top-left1_sur">
                                    <h6>Get In touch</h6>
                                    <p>Are you interested in jobs, need to get latest updates and information?</p>
                                    <form action="/coming-soon" className="subscribe">
                                        <input type="email" className="" placeholder="Enter email" required=""/>
                                        <button><span className="fa fa-paper-plane"></span></button>
                                    </form>
                                </div>
                                <div className="footer17-top-left2_sur">
                                    <h6>Categories list</h6>
                                    <ul>
                                        <li><a href="/coming-soon">IT & Support Engineering</a></li>
                                        <li><a href="/coming-soon">Customer Operations & Success</a></li>
                                        <li><a href="/coming-soon">Product</a></li>
                                        <li><a href="/coming-soon">People & Organization</a></li>
                                    </ul>
                                </div>
                                <div className="footer17-top-left3_sur">
                                    <h6>Locations</h6>
                                    <ul>
                                        <li><a href="/contact">Ireland</a></li>
                                        <li><a href="/contact">Australia</a></li>
                                        <li><a href="/contact">Croatia</a></li>
                                        <li><a href="/contact">UK</a></li>
                                    </ul>
                                </div>
                                <div className="footer17-top-left4_sur">
                                    <h6>About US</h6>
                                    <ul>
                                        <li><a href="/coming-soon">Meet our people</a></li>
                                        <li><a href="/coming-soon">Timeline</a></li>
                                        <li><a href="/coming-soon">Blog</a></li>
                                        <li><a href="/contact">Contact us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-left">
                                <p>© 2020 HR management. All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
