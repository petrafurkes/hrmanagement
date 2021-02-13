import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../../../services/auth.service";
import UserService from "../../../../../../services/user.service";



const currentUser = AuthService.getCurrentUser();

export default class EditSingleEducation extends Component {

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
            currentEducation: {
              educationId: null,
              educationCity: '',
              educationCountry: '',
              educationDegree: '',
              educationEndDate: '',
              educationInstitution: '',
              educationStartDate: '',
              educationType: '',
            },
            
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        this.getSingleEducationByIdAndUserId();
      }


      getSingleEducationByIdAndUserId() {
        UserService.getSingleEducationByIdAndUserId(currentUser.id, this.props.match.params.id )
          .then(response => {
            this.setState({
              currentEducation: response
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      // education
      onChangeEducationCity(p) {
        const educationCity = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationCity: educationCity
            }
          };
        });
      }

      onChangeEducationCountry(p) {
        const educationCountry = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationCountry: educationCountry
            }
          };
        });
      }

      onChangeEducationDegree(p) {
        const educationDegree = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationDegree: educationDegree
            }
          };
        });
      }

      onChangeEducationEndDate(p) {
        const educationEndDate = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationEndDate: educationEndDate
            }
          };
        });
      }

      onChangeEducationInstitution(p) {
        const educationInstitution = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationInstitution: educationInstitution
            }
          };
        });
      }

      onChangeEducationStartDate(p) {
        const educationStartDate = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationStartDate: educationStartDate
            }
          };
        });
      }

      onChangeEducationType(p) {
        const educationType = p.target.value

        this.setState(function(prevState){
          return {
            currentEducation: {
              ...prevState.currentEducation,
              educationType: educationType
            }
          };
        });
      }

      handleEducation(p) {
        p.preventDefault();
    
        this.setState({
          successful: false
        });

        if (this.checkBtnEducation.context._errors.length === 0) {
          UserService.editEducation(
            currentUser.id, 
            this.props.match.params.id, 
            this.state.currentEducation.educationCity,
            this.state.currentEducation.educationCountry,
            this.state.currentEducation.educationDegree,
            this.state.currentEducation.educationEndDate,
            this.state.currentEducation.educationInstitution,
            this.state.currentEducation.educationStartDate,
            this.state.currentEducation.educationType
            

          ).then(
            response => {
              this.setState(prevState => ({
                currentEducation: {
                  ...prevState.currentEducation,
                },
                successful: true
              }));
              this.props.history.push("/account/edit/education");
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
              {(this.state.userReady) && (this.state.currentEducation) ?
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
                                                                    value={this.state.currentEducation.educationDegree}
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
                                                                    value={this.state.currentEducation.educationType}
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
                                                                    value={this.state.currentEducation.educationInstitution}
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
                                                                    value={this.state.currentEducation.educationStartDate}
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
                                                                    value={this.state.currentEducation.educationEndDate}
                                                                    />
                                                                </div>
                                                              <div className="form-input">
                                                              <h2 className="card-title">City</h2>
                                                                  <Input 
                                                                    className="antt-input"
                                                                    type="text" 
                                                                    name="educationCity" 
                                                                    placeholder="City" 
                                                                    onChange={this.onChangeEducationCity}
                                                                    value={this.state.currentEducation.educationCity}
                                                                    />
                                                              </div>
                                                              <div className="form-input">
                                                              <h2 className="card-title">Country</h2>
                                                                  <Input 
                                                                    className="antt-input"
                                                                    type="text" 
                                                                    name="educationCountry" 
                                                                    placeholder="Country" 
                                                                    onChange={this.onChangeEducationCountry}
                                                                    value={this.state.currentEducation.educationCountry}
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
                                            <img src="/images/job4.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job10.jpg" alt="" />
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
