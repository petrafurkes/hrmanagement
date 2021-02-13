import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../../../services/auth.service";
import UserService from "../../../../../../services/user.service";



const currentUser = AuthService.getCurrentUser();

export default class EditSingleExperience extends Component {

    constructor(props) {
        super(props);
        this.handleExperience = this.handleExperience.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeExperienceCity = this.onChangeExperienceCity.bind(this);
        this.onChangeExperienceCountry = this.onChangeExperienceCountry.bind(this);
        this.onChangeExperienceEndDate = this.onChangeExperienceEndDate.bind(this);
        this.onChangeExperienceStartDate = this.onChangeExperienceStartDate.bind(this);
        this.onChangePositionName = this.onChangePositionName.bind(this);
        this.onChangeSummary = this.onChangeSummary.bind(this);

    
        this.state = {
            successful: false,
            currentExperience: {
                experienceId: null,
                companyName: '',
                experienceCity: '',
                experienceCountry: '',
                experienceEndDate: '',
                experienceStartDate: '',
                positionName: '',
                summary: ''
            },
            
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        this.getSingleExperienceByIdAndUserId();
      }


      getSingleExperienceByIdAndUserId() {
        UserService.getSingleExperienceByIdAndUserId(currentUser.id, this.props.match.params.id )
          .then(response => {
            this.setState({
              currentExperience: response
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      // experience
      onChangeCompanyName(c) {
        const companyName = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                companyName: companyName
              }
            };
          });
        }

      onChangeExperienceCity(c) {
        const experienceCity = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                experienceCity: experienceCity
              }
            };
          });
        }

      onChangeExperienceCountry(c) {
        const experienceCountry = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                experienceCountry: experienceCountry
              }
            };
          });
        }

      onChangeExperienceEndDate(c) {
        const experienceEndDate = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                experienceEndDate: experienceEndDate
              }
            };
          });
        }

      onChangeExperienceStartDate(c) {
        const experienceStartDate = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                experienceStartDate: experienceStartDate
              }
            };
          });
        }

      onChangePositionName(c) {
        const positionName = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                positionName: positionName
              }
            };
          });
        }

      onChangeSummary(c) {
        const summary = c.target.value

        this.setState(function(prevState){
            return {
              currentExperience: {
                ...prevState.currentExperience,
                summary: summary
              }
            };
          });
        }

      handleExperience(p) {
        p.preventDefault();
    
        this.setState({
          successful: false
        });
       
    
        if (this.checkBtnExperience.context._errors.length === 0) {
          UserService.editExperience(
            currentUser.id, 
            this.props.match.params.id, 
            this.state.currentExperience.companyName,
            this.state.currentExperience.experienceCity,
            this.state.currentExperience.experienceCountry,
            this.state.currentExperience.experienceEndDate,
            this.state.currentExperience.experienceStartDate,
            this.state.currentExperience.positionName,
            this.state.currentExperience.summary
            

          ).then(
            response => {
              this.setState(prevState => ({
                currentExperience: {
                  ...prevState.currentExperience,
                },
                successful: true
              }));
              this.props.history.push("/account/edit/experience");
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
      }

      
    render() {
      
      console.log("props details "+ this.props.match.params.id)


      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
        return (
            <section className="account-personal-details">
              {(this.state.userReady) && (this.state.currentExperience) ?
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
                                            <div className="single-left1 mb-0-imp">
                                            <Form onSubmit={this.handleExperience} className="register-form"
                                                    ref={g => {
                                                        this.form = g;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                        <h5 className="card-title">Experience </h5>
                                                          <h2 className="card-title">Position</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="positionName" 
                                                            placeholder="Position" 
                                                            onChange={this.onChangePositionName}
                                                            value={this.state.currentExperience.positionName}
                                                            />
                                                        </div>
                                                        
                                                        <div className="form-input">
                                                          <h2 className="card-title">Company</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="companyName" 
                                                            placeholder="Company" 
                                                            onChange={this.onChangeCompanyName}
                                                            value={this.state.currentExperience.companyName}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Start date</h2>
                                                            <Input
                                                            className="antt-input " 
                                                            type="date" 
                                                            name="experienceStartDate" 
                                                            placeholder="Start date"
                                                            onChange={this.onChangeExperienceStartDate}
                                                            value={this.state.currentExperience.experienceStartDate}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">End date</h2>
                                                            <Input
                                                            className="antt-input " 
                                                            type="date" 
                                                            name="experienceEndDate" 
                                                            placeholder="End date"
                                                            onChange={this.onChangeExperienceEndDate}
                                                            value={this.state.currentExperience.experienceEndDate}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">City</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="experienceCity" 
                                                            placeholder="City" 
                                                            onChange={this.onChangeExperienceCity}
                                                            value={this.state.currentExperience.experienceCity}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Country</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="experienceCountry" 
                                                            placeholder="Country" 
                                                            onChange={this.onChangeExperienceCountry}
                                                            value={this.state.currentExperience.experienceCountry}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Summary</h2>
                                                            <Textarea 
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="summary" 
                                                            placeholder="Summary" 
                                                            onChange={this.onChangeSummary}
                                                            value={this.state.currentExperience.summary}
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
                                                            {this.state.message}
                                                            </div>
                                                        </div>
                                                        )}
                                                        <CheckButton
                                                        style={{ display: "none" }}
                                                        ref={g => {
                                                            this.checkBtnExperience = g;
                                                        }}
                                                        />
                                                    <div className="clear"></div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right-side-bar">
                                    <aside className="posts single-left-inner">
                                            <img src="/images/job2.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job1.jpg" alt="" />
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
