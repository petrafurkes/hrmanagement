import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import UserService from "../../../../../services/user.service";



const currentUser = AuthService.getCurrentUser();

export default class EditCV extends Component {

    constructor(props) {
      super(props);
      this.selectFile = this.selectFile.bind(this);
      this.replaceCV = this.replaceCV.bind(this);
  
      this.state = {
        selectedFiles: undefined,
        currentFile: undefined,
        message: "",
        fileInfos: [],
        userReady: false,
        currentUser: { username: "" }
      };
    }
  
    componentDidMount() {
      if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }
  
    selectFile(event) {
      this.setState({
        selectedFiles: event.target.files,
      });
    }
  
    replaceCV() {
      let currentFile = this.state.selectedFiles[0];
  
      this.setState({
        currentFile: currentFile,
      });
  
      UserService.replaceCV(currentFile)
        .then((response) => {
          this.setState({
            message: response.data.message,
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
    
      

      
    render() {

      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

      const {selectedFiles, currentFile, message } = this.state;

      console.log(selectedFiles);
      console.log(currentFile);

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
                                                <h3 className="card-title">CV </h3>
                                            </div>
                                        </div>
                                        <div className="box-grid">
                                            <div className="single-left1 mb-0-imp">
                                              <label className="btn candidate">
                                                <input type="file" onChange={this.selectFile} />
                                              </label>

                                              <button
                                                className="btn btn-success"
                                                disabled={!selectedFiles}
                                                onClick={this.replaceCV}
                                              >
                                                Upload
                                              </button>

                                              <div className="alert alert-light" role="alert">
                                                {message}
                                              </div>
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
