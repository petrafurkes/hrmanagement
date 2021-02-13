import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";
import { Link } from 'react-router-dom';





const currentUser = AuthService.getCurrentUser();

export default class DeleteEducation extends Component {

    constructor(props) {
        super(props);
        this.handleDeleteEducation = this.handleDeleteEducation.bind(this);

    
        this.state = {

            education: [],
            successful: false,
            message: '',
            userReady: false,
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        this.getEducationByEducationId();
      }

      getEducationByEducationId() {
        UserService.getSingleEducationByIdAndUserId(currentUser.id, this.props.match.params.educationId)
          .then(response => {
            this.setState({
              education: response
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      

      handleDeleteEducation(e) {
        e.preventDefault();
    
        this.setState({
          successful: false
        });
    
          UserService.deleteEducation(this.props.match.params.educationId )
          .then(
              response => {
                this.setState({
                  successful: true,
                  message: response
                });
                this.props.history.push("/user/profile");
                window.location.reload();
                
              })
              .catch(e => {
                console.log(e);
              });
      }


      
    render() {

        console.log(this.props.match.params)


        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }

        return (
            <section className="account-personal-details">
              {(this.state.userReady) && (this.state.education) ?
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
                                        <div className="box-grid">
                                            <div className="single-left1 mb-0-imp">
                                            <h5 className="card-title">Education details</h5>
                                              <div className="single-left-inner">
                                               
                                              <div className="edu-grid">
                                              <h5 className="card-title">Are you sure you want to delete your education details?</h5>
                                                        <h4 className="edu-title">{this.state.education.educationDegree} </h4>
                                                        <span>{this.state.education.educationType}</span>
                                                        <h5 className="edu-title">{this.state.education.educationInstitution}</h5>
                                                        <h5 className="edu-title">{this.state.education.educationCity}, {this.state.education.educationCountry}</h5>
                                                        <label>{this.state.education.educationStartDate}  -  {this.state.education.educationEndDate}</label>
                                                    </div>
                                                  <div>
                                                  <button onClick={this.handleDeleteEducation}
                                                      className="btn-candidate-delete"
                                                      variant="success" 
                                                      type="submit" 
                                                      >Delete education
                                                  </button>
                                                  <Link to="/user/profile" className="">Cancel</Link>
                                              </div>
                                               
                                              </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right-side-bar">
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job4.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                          <img src="/images/resume.jpg" alt="" /> 
                                            
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
               </div>:null}
            </section>
        );
    }
}
