import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";
import { Link } from 'react-router-dom';



const currentUser = AuthService.getCurrentUser();

export default class DisplayEditEducations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            successful: false,
            educations: [],
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        this.retrieveEducations();
      }

      

      retrieveEducations(){
        UserService.getEducationsByUserId(currentUser.id)
        .then(response => {
          this.setState({
              educations: response
          });
          console.log("educations " +JSON.stringify(response));
        })
        .catch(e => {
          console.log(e);
        });
    }



      
    render() {
      const { educations } = this.state;
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
                                            <h5 className="card-title">Education</h5>
                                            {educations &&
                                                educations.map((educations, index) => (
                                                    <div className="edu-grid" data-id={educations.educationId} key={index}>
                                                        <h4 className="edu-title">{educations.educationDegree} </h4>
                                                        <span>{educations.educationType}</span>
                                                        <h5 className="edu-title">{educations.educationInstitution}</h5>
                                                        <h5 className="edu-title">{educations.educationCity}, {educations.educationCountry}</h5>
                                                        <label>{educations.educationStartDate}  -  {educations.educationEndDate}</label>
                                                        <div className="edu-grid">
                                                        <Link to={"/account/edit/education/" + educations.educationId} className="btn-candidate">
                                                            Edit
                                                        </Link>
                                                        <Link to={"/account/delete/education/" + educations.educationId} className="btn-candidate">
                                                            Delete
                                                        </Link>
                                                    </div>
                                                    </div>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="right-side-bar">
                                       
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job3.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/resume-male1.jpg" alt="" />
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
