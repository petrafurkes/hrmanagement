import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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


// education

const peducationCity = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const peducationCountry = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


  const peducationDegree = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  

  const peducationInstitution = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


  const peducationStartDate = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const peducationType = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const currentUser = AuthService.getCurrentUser();

export default class AddEducation extends Component {

    constructor(props) {
        super(props);
        this.handleEducation = this.handleEducation.bind(this);
        this.onChangeEducationCity = this.onChangeEducationCity.bind(this);
        this.onChangeEducationCountry = this.onChangeEducationCountry.bind(this);
        this.onChangeEducationDegree = this.onChangeEducationDegree.bind(this);
        this.onChangeEducationEndDate = this.onChangeEducationEndDate.bind(this);
        this.onChangeEducationInstitution = this.onChangeEducationInstitution.bind(this);
        this.onChangeEducationStartDate = this.onChangeEducationStartDate.bind(this);
        this.onChangeEducationType = this.onChangeEducationType.bind(this);

    
        this.state = {
            successful: false,
            educationCity: '',
            educationCountry: '',
            educationDegree: '',
            educationEndDate: '',
            educationInstitution: '',
            educationStartDate: '',
            educationType: '',
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // education
      onChangeEducationCity(p) {
        this.setState({
          educationCity: p.target.value
        });
      }

      onChangeEducationCountry(p) {
        this.setState({
          educationCountry: p.target.value
        });
      }

      onChangeEducationDegree(p) {
        this.setState({
          educationDegree: p.target.value
        });
      }

      onChangeEducationEndDate(p) {
        this.setState({
          educationEndDate: p.target.value
        });
      }

      onChangeEducationInstitution(p) {
        this.setState({
          educationInstitution: p.target.value
        });
      }

      onChangeEducationStartDate(p) {
        this.setState({
          educationStartDate: p.target.value
        });
      }

      onChangeEducationType(p) {
        this.setState({
          educationType: p.target.value
        });
      }

      handleEducation(p) {
        p.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });

    
        this.form.validateAll();
    
        if (this.checkBtnEducation.context._errors.length === 0) {
          UserService.addEducation(
            this.state.educationCity,
            this.state.educationCountry,
            this.state.educationDegree,
            this.state.educationEndDate,
            this.state.educationInstitution,
            this.state.educationStartDate,
            this.state.educationType

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
                                                <Form onSubmit={this.handleEducation} className="register-form"
                                                        ref={f => {
                                                            this.form = f;
                                                        }}>
                                                        {!this.state.successful && (
                                                          
                                                            <div className="edu-grid">
                                                              <div className="form-input">
                                                                <h5 className="card-title">Education </h5>
                                                                  <h2 className="card-title">Degree</h2>
                                                                  <Input
                                                                      className="antt-input " 
                                                                      type="text" 
                                                                      name="educationDegree" 
                                                                      placeholder="Degree"
                                                                      onChange={this.onChangeEducationDegree}
                                                                      value={this.state.educationDegree}
                                                                      validations={[required, peducationDegree]}
                                                                    />
                                                              </div>
                                                              <div className="form-input">
                                                                <h2 className="card-title">Specialization</h2>
                                                                  <Input
                                                                      className="antt-input " 
                                                                      type="text" 
                                                                      name="educationType" 
                                                                      placeholder="Specialization"
                                                                      onChange={this.onChangeEducationType}
                                                                      value={this.state.educationType}
                                                                      validations={[required, peducationType]}
                                                                    />
                                                              </div>

                                                              <div className="form-input">
                                                                <h2 className="card-title">Institution</h2>
                                                                  <Input
                                                                      className="antt-input " 
                                                                      type="text" 
                                                                      name="educationInstitution" 
                                                                      placeholder="Institution"
                                                                      onChange={this.onChangeEducationInstitution}
                                                                      value={this.state.educationInstitution}
                                                                      validations={[required, peducationInstitution]}
                                                                      />
                                                              </div>
                                                              <div className="form-input">
                                                                <h2 className="card-title">Education start date</h2>
                                                                  <Input
                                                                    className="antt-input " 
                                                                    type="date" 
                                                                    name="educationStartDate" 
                                                                    placeholder="Start date"
                                                                    onChange={this.onChangeEducationStartDate}
                                                                    value={this.state.educationStartDate}
                                                                    validations={[required, peducationStartDate]}
                                                                    />
                                                              </div>
                                                              <div className="form-input">
                                                                <h2 className="card-title">Education end date</h2>
                                                                  <Input
                                                                    className="antt-input " 
                                                                    type="date" 
                                                                    name="educationEndDate" 
                                                                    placeholder="End date"
                                                                    onChange={this.onChangeEducationEndDate}
                                                                    value={this.state.educationEndtDate}
                                                                    />
                                                                </div>
                                                              <div className="form-input">
                                                                <h2 className="card-title">City</h2>
                                                                    <Input required
                                                                      className="antt-input"
                                                                      type="text" 
                                                                      name="educationCity" 
                                                                      placeholder="City" 
                                                                      onChange={this.onChangeEducationCity}
                                                                      value={this.state.educationCity}
                                                                      validations={[required, peducationCity]}
                                                                      />
                                                              </div>
                                                              <div className="form-input">
                                                                <h2 className="card-title">Country</h2>
                                                                    <Input required
                                                                      className="antt-input"
                                                                      type="text" 
                                                                      name="educationCountry" 
                                                                      placeholder="Country" 
                                                                      onChange={this.onChangeEducationCountry}
                                                                      value={this.state.educationCountry}
                                                                      validations={[required, peducationCountry]}
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
                                                                ref={f => {
                                                                    this.checkBtnEducation = f;
                                                                }}
                                                                />
                                                        <div className="clear"></div>
                                                </Form> 
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right-side-bar">
                                        
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job7.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job8.jpg" alt="" />
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
