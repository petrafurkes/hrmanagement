import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


// experience


const ccompanyName = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const cexperienceCity = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const cexperienceCountry = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  

  const cexperienceStartDate = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const cpositionName = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const csummary = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const currentUser = AuthService.getCurrentUser();

export default class AddExperience extends Component {

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
            companyName: '',
            experienceCity: '',
            experienceCountry: '',
            experienceEndDate: '',
            experienceStartDate: '',
            positionName: '',
            summary: '',
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        
        
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // experience
      onChangeCompanyName(c) {
        this.setState({
          companyName: c.target.value
        });
      }

      onChangeExperienceCity(c) {
        this.setState({
          experienceCity: c.target.value
        });
      }

      onChangeExperienceCountry(c) {
        this.setState({
          experienceCountry: c.target.value
        });
      }

      onChangeExperienceEndDate(c) {
        this.setState({
          experienceEndDate: c.target.value
        });
      }

      onChangeExperienceStartDate(c) {
        this.setState({
          experienceStartDate: c.target.value
        });
      }

      onChangePositionName(c) {
        this.setState({
          positionName: c.target.value
        });
      }

      onChangeSummary(c) {
        this.setState({
          summary: c.target.value
        });
      }

      handleExperience(c) {
        c.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();

    
        if (this.checkBtnExperience.context._errors.length === 0) {
          UserService.addExperience(
            this.state.companyName,
            this.state.experienceCity,
            this.state.experienceCountry,
            this.state.experienceEndDate,
            this.state.experienceStartDate,
            this.state.positionName,
            this.state.summary

          ).then(
            response => {
              this.setState({
                successful: true
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
      }
      
    render() {

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
                                                <a href="/account/tab/education">
                                                <h3 className="card-title">Education </h3>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <a href="/account/tab/experience">
                                                <h3 className="card-title">Experience </h3>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="accountTabs">
                                            <div className="single-left1 mb-0-imp">
                                                <h3 className="card-title">CV </h3>
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
                                                            <Input required 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="positionName" 
                                                            placeholder="Position" 
                                                            onChange={this.onChangePositionName}
                                                            value={this.state.positionName}
                                                            validations={[required, cpositionName]}
                                                            />
                                                      </div>
                                                      
                                                      <div className="form-input">
                                                        <h2 className="card-title">Company</h2>
                                                          <Input required
                                                          className="antt-input"
                                                          type="text" 
                                                          name="companyName" 
                                                          placeholder="Company" 
                                                          onChange={this.onChangeCompanyName}
                                                          value={this.state.companyName}
                                                          validations={[required, ccompanyName]}
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
                                                          value={this.state.experienceStartDate}
                                                          validations={[required, cexperienceStartDate]}
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
                                                          value={this.state.experienceEndDate}
                                                          />
                                                      </div>

                                                      <div className="form-input">
                                                        <h2 className="card-title">City</h2>
                                                          <Input required
                                                          className="antt-input"
                                                          type="text" 
                                                          name="experienceCity" 
                                                          placeholder="City" 
                                                          onChange={this.onChangeExperienceCity}
                                                          value={this.state.experienceCity}
                                                          validations={[required, cexperienceCity]}
                                                          />
                                                      </div>
                                                      <div className="form-input">
                                                        <h2 className="card-title">Country</h2>
                                                          <Input required
                                                          className="antt-input"
                                                          type="text" 
                                                          name="experienceCountry" 
                                                          placeholder="Country" 
                                                          onChange={this.onChangeExperienceCountry}
                                                          value={this.state.experienceCountry}
                                                          validations={[required, cexperienceCountry]}
                                                          />
                                                      </div>
                                                      <div className="form-input">
                                                        <h2 className="card-title">Summary</h2>
                                                          <Textarea required
                                                          className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                          spellCheck="false"
                                                          type="text" 
                                                          name="summary" 
                                                          placeholder="Summary" 
                                                          onChange={this.onChangeSummary}
                                                          value={this.state.summary}
                                                          validations={[required, csummary]}
                                                          />
                                                      </div>
                                                      <button className="btn-candidate"
                                                          variant="success" 
                                                          type="submit" 
                                                          >
                                                          Add
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
                                            <img src="/images/job5.jpg" alt="" />
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
