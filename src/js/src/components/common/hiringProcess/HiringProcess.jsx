import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import ManagementService from "../../../services/management.service";





const currentUser = AuthService.getCurrentUser();

export default class HiringProcess extends Component {

    constructor(props) {
        super(props);
        this.handleHiringProcess = this.handleHiringProcess.bind(this);
        this.onChangeApplicationStatus = this.onChangeApplicationStatus.bind(this);

    
        this.state = {

            application: [],
            successful: false,
            message: '',
            userReady: false,
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        this.getApplicationByApplicationId();
      }

      getApplicationByApplicationId() {
        ManagementService.getApplicationByApplicationId(this.props.match.params.applicationId)
          .then(response => {
            this.setState({
              application: response
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      

      onChangeApplicationStatus(c) {
        this.setState({
          applicationStatus: c.target.value
        });
      }

     
     
      handleHiringProcess(e) {
        e.preventDefault();
    
        this.setState({
          successful: false
        });
    
    
        if (this.checkBtn.context._errors.length === 0) {
          ManagementService.updateApplicationStatus(
            this.props.match.params.applicantId, 
            this.props.match.params.applicationId, 
            this.state.applicationStatus

            ).then(
              response => {
                this.setState({
                  successful: true
                });
                this.props.history.push("/management/hruser");
                window.location.reload();
                console.log(response)
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
      }


      
    render() {

        console.log(this.props.match.params.applicantId)
        console.log(this.props.match.params.applicationId)


        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }

        return (
            <section className="account-personal-details">
              {(this.state.userReady) && (this.state.application) ?
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
                                            <h5 className="card-title">Application details</h5>
                                              <div className="single-left-inner">
                                               
                                                  <div className="edu-grid" >
                                                      <label>Job position: {this.state.application.jobTitle}, {this.state.application.jobCity}</label>
                                                      <h5 className="edu-title">Contract: {this.state.application.contractType}</h5>
                                                      <span>Applicant: {this.state.application.userFullName}</span>
                                                      <span>Email address: {this.state.application.userEmail}</span>
                                                      <span>Contact: {this.state.application.userMobileNumber}</span>
                                                      <span>Application status: {this.state.application.applicationStatus}</span>
                                                      <span>Application received: {this.state.application.applicationDate}</span>
                                                      
                                                  </div>
                                               
                                              </div>
                                                <Form onSubmit={this.handleHiringProcess} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                        <h2 className="card-title">Status</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="applicationStatus" 
                                                            placeholder="Status" 
                                                            onChange={this.onChangeApplicationStatus}
                                                            value={this.state.applicationStatus}
                                                            />
                                                        </div>
                                                        <button className="btn-candidate"
                                                            variant="success" 
                                                            type="submit" 
                                                            >
                                                            Save
                                                        </button>
                                                    </div>
                                                        )}
                                                        {this.state.message && (
                                                        <div className="form-group">
                                                            <div
                                                            className={
                                                                this.state.successful
                                                                ? "alert alert-success"
                                                                : "alert alert-danger"
                                                            }
                                                            role="alert"
                                                            >
                                                            </div>
                                                        </div>
                                                        )}
                                                        <CheckButton
                                                        style={{ display: "none" }}
                                                        ref={d => {
                                                            this.checkBtn = d;
                                                        }}
                                                        />
                                                    <div className="clear"></div>
                                                </Form>
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
