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


//personal details
const efullName = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const emobileNumber = value => {
  if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const ebirthDate = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const egender = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const eaddress = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const epostcode = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ecity = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ecountry = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const eaboutMe = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const currentUser = AuthService.getCurrentUser();

export default class AddPersonalDetails extends Component {

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
            successful: false,
            aboutMe: '',
            address: '',
            birthDate: '',
            city: '',
            country: '',
            fullName: '',
            gender: '',
            mobileNumber: '',
            postcode: '',
            message: "",
            userReady: false,
            currentUser: { username: "" }
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // personal details
      onChangeFullNname(e) {
        this.setState({
          fullName: e.target.value
        });
      }
    
      onChangeMobileNumber(e) {
        this.setState({
          mobileNumber: e.target.value
        });
      }
    
      onChangeBirthDate(e) {
        this.setState({
          birthDate: e.target.value
        });
      }

      onChangeGender(e) {
        this.setState({
          gender: e.target.value
        });
      }
    
      onChangeAddress(e) {
        this.setState({
          address: e.target.value
        });
      }
    
      onChangePostcode(e) {
        this.setState({
          postcode: e.target.value
        });
      }

      onChangeCity(e) {
        this.setState({
          city: e.target.value
        });
      }
    
      onChangeCountry(e) {
        this.setState({
          country: e.target.value
        });
      }
    
      onChangeAboutMe(e) {
        this.setState({
          aboutMe: e.target.value
        });
      }

      handlePersonalDetails(e) {
        e.preventDefault();
    
        this.setState({
          successful: false,
          message: ""
          
        });
    
        this.form.validateAll();
    
        if (this.checkBtnPersonal.context._errors.length === 0) {
          UserService.registerPersonalDetails(
            this.state.aboutMe,
            this.state.address,
            this.state.birthDate,
            this.state.city,
            this.state.country,
            this.state.fullName,
            this.state.gender,
            this.state.mobileNumber,
            this.state.postcode

          ).then(
            response => {
              this.setState({
                successful: true, 
                message: response
                
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
                                                <Form onSubmit={this.handlePersonalDetails} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                          <h5 className="card-title">About me </h5>
                                                              <Textarea required
                                                              className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                              spellCheck="false"
                                                              type="text" 
                                                              name="aboutme" 
                                                              placeholder="Summary" 
                                                              onChange={this.onChangeAboutMe}
                                                              value={this.state.aboutMe}
                                                              validations={[required, eaboutMe]}
                                                              />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">First and last name</h2>
                                                              <Input required 
                                                              className="antt-input"
                                                              type="text" 
                                                              name="fullName" 
                                                              placeholder="First and last name" 
                                                              onChange={this.onChangeFullNname}
                                                              value={this.state.fullName}
                                                              validations={[required, efullName]}
                                                              />
                                                        </div>
                                                        
                                                        <div className="form-input">
                                                          <h2 className="card-title">Mobile number</h2>
                                                              <Input required
                                                              className="antt-input"
                                                              type="text" 
                                                              name="mobileNumber" 
                                                              placeholder="Mobile number" 
                                                              onChange={this.onChangeMobileNumber}
                                                              value={this.state.mobileNumber}
                                                              validations={[required, emobileNumber]}
                                                              />
                                                        </div>
                                                        <div className="form-input">
                                                            <h2 className="card-title">Date of birth</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="date" 
                                                            name="birthDate" 
                                                            placeholder="Date of birth" 
                                                            onChange={this.onChangeBirthDate}
                                                            value={this.state.birthDate}
                                                            validations={[required, ebirthDate]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Gender</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="gender" 
                                                            placeholder="Gender" 
                                                            onChange={this.onChangeGender}
                                                            value={this.state.gender}
                                                            validations={[required, egender]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Address</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="address" 
                                                            placeholder="Address" 
                                                            onChange={this.onChangeAddress}
                                                            value={this.state.address}
                                                            validations={[required, eaddress]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Postcode</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="postcode" 
                                                            placeholder="Postcode" 
                                                            onChange={this.onChangePostcode}
                                                            value={this.state.postcode}
                                                            validations={[required, epostcode]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">City</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="city" 
                                                            placeholder="City" 
                                                            onChange={this.onChangeCity}
                                                            value={this.state.city}
                                                            validations={[required, ecity]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Country</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="country" 
                                                            placeholder="Country" 
                                                            onChange={this.onChangeCountry}
                                                            value={this.state.country}
                                                            validations={[required, ecountry]}
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
                                            <img src="/images/job5.jpg" alt="" />
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
