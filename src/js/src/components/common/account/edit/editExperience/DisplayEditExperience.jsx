import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";
import { Link } from 'react-router-dom';



const currentUser = AuthService.getCurrentUser();

export default class DisplayEditExperience extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            successful: false,
            experiences: [],
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        this.retrieveExperiences();
      }

      


      retrieveExperiences(){
        UserService.getExperiencesByUserId(currentUser.id)
        .then(response => {
          this.setState({
              experiences: response
          });
          console.log("experiences list " +JSON.stringify(response));
        })
        .catch(e => {
          console.log(e);
        });
    }

      
    render() {
      const { experiences } = this.state;
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
        return (
            <section className="account-personal-details">
              {(this.state.userReady) ?
                <div>
                    <section className="hrm-employer-detail-banner">
                        <div className="wrapper">
                            <div className="d-grid employer-grid">
                            </div>
                        </div>
                    </section>
                    <section className="hrm-blog-single">
                        <div className="single blog">
                            <div className="wrapper">
                                <div className="d-grid grid-colunm-2">
                                    <div className="single-left">
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <h3 className="card-title">Personal Details </h3>
                                            </div>
                                        </div>
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <a href="/account/edit/education">
                                                <h3 className="card-title">Education </h3>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <a href="/account/edit/experience">
                                                <h3 className="card-title">Experience </h3>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <a href="/comming-soon">
                                                <h3 className="card-title">CV </h3>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="box-grid">
                                            <h5 className="card-title">Experience</h5>
                                            {experiences &&
                                                    experiences.map((experiences, index) => (
                                                    <div className="edu-grid" data-id={experiences.experienceId} key={index}>
                                                        <h4 className="edu-title">{experiences.positionName} </h4>
                                                        <span>{experiences.companyName}</span>
                                                        <h5 className="edu-title">{experiences.experienceCity}, {experiences.experienceCountry}</h5>
                                                        <label>{experiences.experienceStartDate} - {experiences.experienceEndDate}</label>
                                                        <p>{experiences.summary}</p>
                                                        <div className="edu-grid">
                                                        <Link to={"/account/edit/experience/" + experiences.experienceId} className="btn-candidate">
                                                            Edit
                                                        </Link>
                                                        <Link to={"/account/delete/experience/" + experiences.experienceId} className="btn-candidate">
                                                            Delete
                                                        </Link>
                                                    </div>
                                                    </div>
                                             ))}
                                        </div>
                                    </div>
                                  
                                    <div className="right-side-bar">
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job2.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job7.jpg" alt="" />
                                        </aside>
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
