import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";

export default class DeleteMessage extends Component {

    constructor(props) {
        super(props);
        
        this.deleteAccount = this.deleteAccount.bind(this);
    
        this.state = {
            successful: false,
            userReady: false,
            currentUser: {username: ""},
            message: ""
        };
      }
    
      componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      deleteAccount(p) {
        p.preventDefault();
    
        this.setState({
          message: "Your account has been deleted!",
          successful: false
        });
    
       
          UserService.deleteUser(this.state.currentUser.id)
          .then(
            response => {
              this.setState({
                successful: true,
                message: response
              });
              this.props.history.push("/home");
              window.location.reload();
              
            AuthService.logout();
            })
            .catch(e => {
              console.log(e);
            });
        }
    
      
      
    

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        return (
            <section className="about">
                <section className="hrm-inner-banner">
                    <div className="wrapper">
                    </div>
                </section>
                <section className="hrm-breadcrumns">
                    <div className="wrapper">
                    <ul>
                        <li><a href="/home">Home</a> <span className="fa fa-angle-double-right"></span></li>
                        <li>Account delete</li>
                    </ul>
                    </div>
                </section>

                <section className="hrm-features-photo-7">
                    <div className="hrm-features-photo-7_sur">
                        <h3 className="heading"> Are you sure you want to delete your account?</h3>

                        <div className="wrapper">
                            <div className="hrm-features-photo-7_top-right">
                                <img src="/images/leaving.jpg" className="img-responsive5" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            
                <section className="hrm-features-4">
                    <div id="features4-block">
                        <h3 className="heading"> How It Works</h3>
                        <div className="wrapper">
                            <div className="features4-grids d-grid">
                                <div className="features4-grid-5">
                                </div>
                                <div className="features4-grid">
                                    <div className="icon2">
                                        <span className="fa text-center fa-star"></span>
                                    </div>
                                    <h5><a href="/jobs">Stay with us</a></h5>
                                    <p>We have plenty of attractive opportunities that can change your life.</p>
                                </div>
                                

                                <div className="features4-grid">
                                    <div className="icon4">
                                    <span className="fa text-center fa-paper-plane"></span>
                                    </div>
                                    <h5><a href="#URL">Sad to see you go</a></h5>
                                    <div>
                                        <button onClick={this.deleteAccount}
                                            className="btn-candidate-delete"
                                            variant="success" 
                                            type="submit" 
                                            >Delete account
                                        </button>
                                    </div>
                                <div className="clear"></div>
                                </div>
                                <div className="features4-grid-5"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="hrm-counter-top-6">
                    <section id="counter-6-inf-block" className="counter-main">
                        <div className="wrapper-full-gd">
                        </div>
                    </section>
                </div>
            </section>
        )
    }

}