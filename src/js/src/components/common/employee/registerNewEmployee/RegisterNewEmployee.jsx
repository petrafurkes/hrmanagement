import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import ManagementService from "../../../../services/management.service";




const currentUser = AuthService.getCurrentUser();

export default class RegisterNewEmployee extends Component {

    constructor(props) {
        super(props);
        this.handleNewEmployee = this.handleNewEmployee.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangePersonalEmail = this.onChangePersonalEmail.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeHomeAddress = this.onChangeHomeAddress.bind(this);

    
        this.state = {
            successful: false,
            fullName: '',
            mobileNumber: '',
            personalEmail: '',
            birthDate: '',
            gender: '',
            homeAddress: '',
            message: ''
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // job details

      onChangeFullName(e) {
        this.setState({
          fullName: e.target.value
        });
      }

      onChangeMobileNumber(e) {
        this.setState({
          mobileNumber: e.target.value
        });
      }

      onChangePersonalEmail(e) {
        this.setState({
          personalEmail: e.target.value
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

        onChangeHomeAddress(e) {
          this.setState({
              homeAddress: e.target.value
          });
        }

        
     
      handleNewEmployee(e) {
        e.preventDefault();
    
        this.setState({
          successful: false,
          message: ""
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          ManagementService.registerNewEmployee(
            this.state.fullName,
            this.state.mobileNumber,
            this.state.personalEmail,
            this.state.birthDate,
            this.state.gender,
            this.state.homeAddress
          ).then(
            response => {
              
              this.setState({
                successful: true,
                message: response
              });
              this.props.history.push("/management/employee/add-employment-details");
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
        return (
            <section className="account-personal-details">
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
                                            <h5 className="card-title">Register new employee </h5>
                                                <Form onSubmit={this.handleNewEmployee} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Full name</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="fullName" 
                                                            placeholder="Full name" 
                                                            onChange={this.onChangeFullName}
                                                            value={this.state.fullName}
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
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Personal email</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="personalEmail" 
                                                            placeholder="Personal email" 
                                                            onChange={this.onChangePersonalEmail}
                                                            value={this.state.personalEmail}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                            <h2 className="card-title">Birth date</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="date" 
                                                            name="birthDate" 
                                                            onChange={this.onChangeBirthDate}
                                                            value={this.state.birthDate}
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
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Address</h2>
                                                            <Input required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="homeAddress" 
                                                            placeholder="Address" 
                                                            onChange={this.onChangeHomeAddress}
                                                            value={this.state.homeAddress}
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
                                            <img src="/images/job2.jpg" alt="" />
                                        </aside>
                                        
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job7.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job10.jpg" alt="" />
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
               </div>
            </section>
        );
    }
}
