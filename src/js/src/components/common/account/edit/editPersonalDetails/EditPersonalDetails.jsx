import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";


const currentUser = AuthService.getCurrentUser();

export default class EditPersonalDetails extends Component {

    constructor(props) {
        super(props);
        this.handlePersonalDetails = this.handlePersonalDetails.bind(this);
        this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeFullNname = this.onChangeFullNname.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangePostcode = this.onChangePostcode.bind(this);

    
        this.state = {
          currentPersonalDetails:{
            id: null,
            aboutMe: '',
            address: '',
            birthDate: '',
            city: '',
            country: '',
            fullName: '',
            gender: '',
            mobileNumber: '',
            postcode: ''
          },
            successful: false,
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        this.getUserPersonalDetails();
      }


      getUserPersonalDetails() {
        UserService.getUserById(currentUser.id)
          .then(response => {
            this.setState({
              currentPersonalDetails: response.userPersonalDetails
            });
            console.log(response.userPersonalDetails);
          })
          .catch(e => {
            console.log(e);
          });
      }

      // personal details
      onChangeFullNname(e) {
        const fullName = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              fullName: fullName
            }
          };
        });
      }
    
      onChangeMobileNumber(e) {
        const mobileNumber = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              mobileNumber: mobileNumber
            }
          };
        });
      }
    
      onChangeBirthDate(e) {
        const birthDate = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              birthDate: birthDate
            }
          };
        });
      }

      onChangeGender(e) {
        const gender = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              gender: gender
            }
          };
        });
      }
    
      onChangeAddress(e) {
        const address = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              address: address
            }
          };
        });
      }
    
      onChangePostcode(e) {
        const postcode = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              postcode: postcode
            }
          };
        });
      }

      onChangeCity(e) {
        const city = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              city: city
            }
          };
        });
      }
    
      onChangeCountry(e) {
        const country = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              country: country
            }
          };
        });
      }
    
      onChangeAboutMe(e) {
        const aboutMe = e.target.value

        this.setState(function(prevState){
          return {
            currentPersonalDetails: {
              ...prevState.currentPersonalDetails,
              aboutMe: aboutMe
            }
          };
        });
      }

      handlePersonalDetails(e) {
        e.preventDefault();
    
        this.setState({
          successful: false,
          message: ""
          
        });
    
        
    
        if (this.checkBtnPersonal.context._errors.length === 0) {
          UserService.editPersonalDetails(
            this.state.currentPersonalDetails.aboutMe,
            this.state.currentPersonalDetails.address,
            this.state.currentPersonalDetails.birthDate,
            this.state.currentPersonalDetails.city,
            this.state.currentPersonalDetails.country,
            this.state.currentPersonalDetails.fullName,
            this.state.currentPersonalDetails.gender,
            this.state.currentPersonalDetails.mobileNumber,
            this.state.currentPersonalDetails.postcode

          ).then(
            response => {
              
              this.setState(prevState => ({
                currentPersonalDetails: {
                  ...prevState.currentPersonalDetails,
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

        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        return (
            <section className="account-personal-details">
               {(this.state.userReady) && (this.state.currentPersonalDetails) ?
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
                                                <Form onSubmit={this.handlePersonalDetails} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                          <h5 className="card-title">About me </h5>
                                                            <Textarea 
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="aboutme" 
                                                            placeholder="Summary" 
                                                            onChange={this.onChangeAboutMe}
                                                            value={this.state.currentPersonalDetails.aboutMe}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">First and last name</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="fullName" 
                                                            placeholder="First and last name" 
                                                            onChange={this.onChangeFullNname}
                                                            value={this.state.currentPersonalDetails.fullName}
                                                            />
                                                        </div>
                                                        
                                                        <div className="form-input">
                                                          <h2 className="card-title">Mobile number</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="mobileNumber" 
                                                            placeholder="Mobile number" 
                                                            onChange={this.onChangeMobileNumber}
                                                            value={this.state.currentPersonalDetails.mobileNumber}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                            <h2 className="card-title">Date of birth</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="date" 
                                                            name="birthDate" 
                                                            placeholder="Date of birth" 
                                                            onChange={this.onChangeBirthDate}
                                                            value={this.state.currentPersonalDetails.birthDate}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Gender</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="gender" 
                                                            placeholder="Gender" 
                                                            onChange={this.onChangeGender}
                                                            value={this.state.currentPersonalDetails.gender}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Address</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="address" 
                                                            placeholder="Address" 
                                                            onChange={this.onChangeAddress}
                                                            value={this.state.currentPersonalDetails.address}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Postcode</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="postcode" 
                                                            placeholder="Postcode" 
                                                            onChange={this.onChangePostcode}
                                                            value={this.state.currentPersonalDetails.postcode}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">City</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="city" 
                                                            placeholder="City" 
                                                            onChange={this.onChangeCity}
                                                            value={this.state.currentPersonalDetails.city}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Country</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="country" 
                                                            placeholder="Country" 
                                                            onChange={this.onChangeCountry}
                                                            value={this.state.currentPersonalDetails.country}
                                                            />
                                                        </div>
                                                        <button className="btn-candidate"
                                                            variant="success" 
                                                            type="submit" 
                                                            >
                                                            Next
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
                                                            {this.state.fullName}
                                                            </div>
                                                        </div>
                                                        )}
                                                        <CheckButton
                                                        style={{ display: "none" }}
                                                        ref={d => {
                                                            this.checkBtnPersonal = d;
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
