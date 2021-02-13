import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              this.props.history.push("/home");
              console.log()
              window.location.reload();
            },
            error => {
              var resMessage = "";
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                if(error.toString().includes(401)){
                  resMessage = "You have entered incorrect username or password. Please try again!";
                }
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
      }
    render() {
        return (
            <section className="login">
                <section className="hrm-inner-banner">
                    <div className="wrapper">
                    </div>
                </section>
                <section className="hrm-forms-31">
                    <div id="hrm-forms-31_sur">
                        <div className="wrapper">
                            <div className="d-grid">
                                <div className="hrm-forms-31-top">
                                    <img src="/images/blog1.jpg" className="img-responsive" alt="" />
                                </div>
                                <div className="hrm-forms-31-right">
                                    <h4>Login using username</h4>
                                    <Form 
                                        className="login-form"
                                        onSubmit={this.handleLogin}
                                        ref={c => {
                                          this.form = c;
                                        }}
                                        >
                                          <div className="form-input">
                                              <Input required
                                                  type="username" 
                                                  name="username" 
                                                  placeholder="Enter your username" 
                                                  onChange={this.onChangeUsername}
                                                  validations={[required]}
                                              />
                                          </div>
                                          <div className="form-input">
                                              <Input required
                                                  type="password" 
                                                  name="password" 
                                                  placeholder="Enter your password" 
                                                  value={this.state.password}
                                                  onChange={this.onChangePassword}
                                                  validations={[required]}
                                              />
                                          </div>
                                            <button 
                                                className="btn"
                                                type="submit" 
                                                disabled={this.state.loading}
                                                >
                                                    {this.state.loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                        )}
                                                        <span>Login</span>
                                            </button>
                                            <div class="clear"></div>
                                                <p class="form_acunt text-center">Don't have an account? <a href="/register">Sign up
                                                    now</a></p>
                                            {this.state.message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                {this.state.message}
                                                </div>
                                            </div>
                                            )}
                                            <CheckButton
                                            style={{ display: "none" }}
                                            ref={c => {
                                                this.checkBtn = c;
                                            }}
                                            />
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default Login;