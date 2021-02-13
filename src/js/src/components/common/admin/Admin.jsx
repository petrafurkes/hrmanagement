import React, { Component } from 'react';
import AuthService from "../../../services/auth.service";
import AdminService from '../../../services/admin.service';

const currentUser = AuthService.getCurrentUser();

export default class Admin extends Component {

    constructor (props) {
        super(props);
        this.state = {
            users: [],
            role: [],
            userPersonalDetails: [],
            education: [],
            experience: [],
            application: [],
            userReady: false,
        };
    }

    componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        this.displayUsers();
    }


    displayUsers(){
        AdminService.getAllUsers()
        .then(response => {
          this.setState({
              users: response,
              role: response.roles,
              userPersonalDetails: response.userPersonalDetails,
              education: response.educations,
              experience: response.experiences,
              application: response.applications
          });
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }

    render(){
        const { users } = this.state;

        
        return(

            <section>
                <section className="hrm-inner-banner">
                    <div className="wrapper">
                    </div>
                </section>
                <section className="hrm-breadcrumns">
                    <div className="wrapper">
                        <ul>
                            <li><a href="/home">Home</a> <span className="fa fa-angle-double-right"></span></li>
                            <li>Users</li>
                        </ul>
                    </div>
                </section>
                <section className="hrm-blog-single">
                        <div className="single blog">
                        <h3 className="heading"> Hello {currentUser.username}!</h3>
                                <div className="hrm-features-photo-7_sur-1">
                                </div>
                            <div className="wrapper">
                                <div className="d-grid grid-colunm-2">
                                    <div className="single-left">
                                    {users &&
                                        users.map((users, index) => (
                                        <div className="box-grid">
                                            <div className="single-left1 mb-0-imp">
                                                <p>ID: {users.id}, username: {users.username}, email: {users.email}</p>
                                                {users.roles &&
                                                    users.roles.map((roles, index) => (
                                                <div data-id={roles.id} key={index}> 
                                                    <p> Role name: {roles.name}</p>
                                                </div>
                                                ))} 
                                            </div>
                                        </div>
                                          ))}  
                                    </div>

                                    <div className="right-side-bar">
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job10.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job4.jpg" alt="" />
                                        </aside>
                                        <aside className="posts single-left-inner">
                                            <img src="/images/job3.jpg" alt="" />
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </section>
        )
    }
}



