import React, { Component } from 'react';
import AuthService from "../../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };





export default class RegisterHRUser extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerHRUser(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
            
          });
          alert(response.data.message)
          this.props.history.push("/login");
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
          
            <section className="register">
                    <section className="hrm-inner-banner">
                        <div className="wrapper">
                        </div>
                    </section>
                    <section className="hrm-price-2 hrm-register-block">
                        <div className="price-main hrm-register-block-main">
                            <div className="wrapper">
                                <div className="pricing-style-hrms">
                                    <div id="monthly" className="">
                                        <div className="hrm-forms-31-right">
                                            <Form onSubmit={this.handleRegister} className="register-form"
                                                    ref={c => {
                                                        this.form = c;
                                                    }}>
                                                      
                                              {!this.state.successful && (
                                                  
                                              <div>
                                                <h3>Hello!</h3>
                                                  <div className="form-input"><label>Your username</label>
                                                      <Input required 
                                                      type="text" 
                                                      name="username" 
                                                      placeholder="Enter your username" 
                                                      onChange={this.onChangeUsername}
                                                      value={this.state.username}
                                                      validations={[required, vusername]}
                                                      />
                                                  </div>
                                                  <div className="form-input"><label>Email Address</label>
                                                      <Input required
                                                      type="email" 
                                                      name="email" 
                                                      placeholder="Enter your email" 
                                                      onChange={this.onChangeEmail}
                                                      value={this.state.email}
                                                      validations={[required, email]}
                                                      />
                                                  </div>
                                                  <div className="form-input"><label>Create Password</label>
                                                      <Input required
                                                      type="password" 
                                                      name="password" 
                                                      placeholder="Minimum 6 characters"
                                                      onChange={this.onChangePassword}
                                                      value={this.state.password}
                                                      validations={[required, vpassword]}
                                                      />
                                                  </div>
                                                  <button 
                                                    variant="success" 
                                                    type="submit" 
                                                    className="btn"
                                                    >
                                                    Create your account
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
                                                    ref={c => {
                                                      this.checkBtn = c;
                                                    }}
                                                  />
                                                <div className="clear"></div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </section>
        );
    }
}


