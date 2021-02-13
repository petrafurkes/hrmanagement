import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import ManagementService from "../../../../services/management.service";
import PublicService from "../../../../services/public.service";





const currentUser = AuthService.getCurrentUser();

export default class EditJob extends Component {

    constructor(props) {
        super(props);
        this.handleJobDetails = this.handleJobDetails.bind(this);
        this.onChangeContractType = this.onChangeContractType.bind(this);
        this.onChangeJobCategory = this.onChangeJobCategory.bind(this);
        this.onChangeJobCity = this.onChangeJobCity.bind(this);
        this.onChangeJobDateCreated = this.onChangeJobDateCreated.bind(this);
        this.onChangeJobDateExpiration = this.onChangeJobDateExpiration.bind(this);
        this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
        this.onChangeJobRequirements = this.onChangeJobRequirements.bind(this);
        this.onChangeJobResponsibilities = this.onChangeJobResponsibilities.bind(this);
        this.onChangeJobStatus = this.onChangeJobStatus.bind(this);
        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);

    
        this.state = {

            currentJob:{
                id: null,
                contractType: '',
                jobCategory: '',
                jobCity: '',
                jobDateCreated: '',
                jobDateExpiration: '',
                jobDescription: '',
                jobRequirements: '',
                jobResponsibilities: '',
                jobStatus: '',
                jobTitle: '',
                salary: '',
            },
            successful: false,
            message: '',
            userReady: false,
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        this.getJobById();
      }

      getJobById() {
        PublicService.getJobById(this.props.match.params.id )
          .then(response => {
            this.setState({
              currentJob: response
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }

      // job details

      onChangeContractType(e) {
        const contractType = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                contractType: contractType
              }
            };
          });
        }

      onChangeJobCategory(e) {
        const jobCategory = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobCategory: jobCategory
              }
            };
          });
        }

      onChangeJobCity(e) {
        const jobCity = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobCity: jobCity
              }
            };
          });
        }

      onChangeJobDateCreated(e) {
        const jobDateCreated = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobDateCreated: jobDateCreated
              }
            };
          });
        }

      onChangeJobDateExpiration(e) {
        const jobDateExpiration = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobDateExpiration: jobDateExpiration
              }
            };
          });
        }

        onChangeJobDescription(e) {
            const jobDateDescription = e.target.value
            this.setState(function(prevState){
                return {
                  currentJob: {
                    ...prevState.currentJob,
                    jobDateDescription: jobDateDescription
                  }
                };
              });
            }

        onChangeJobResponsibilities(e) {
            const jobResponsibilities = e.target.value
            this.setState(function(prevState){
                return {
                  currentJob: {
                    ...prevState.currentJob,
                    jobResponsibilities: jobResponsibilities
                  }
                };
              });
            }
      
        onChangeJobRequirements(e) {
            const jobRequirements = e.target.value
            this.setState(function(prevState){
                return {
                  currentJob: {
                    ...prevState.currentJob,
                    jobRequirements: jobRequirements
                  }
                };
              });
            }


      onChangeJobTitle(e) {
        const jobTitle = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobTitle: jobTitle
              }
            };
          });
        }
    
    
      onChangeJobStatus(e) {
        const jobStatus = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                jobStatus: jobStatus
              }
            };
          });
        }

      onChangeSalary(e) {
        const salary = e.target.value
        this.setState(function(prevState){
            return {
              currentJob: {
                ...prevState.currentJob,
                salary: salary
              }
            };
          });
        }
     
      handleJobDetails(e) {
        e.preventDefault();
    
        this.setState({
          successful: false
        });
    
    
        if (this.checkBtn.context._errors.length === 0) {
          ManagementService.editJob(
            this.props.match.params.id, 
            this.state.currentJob.contractType,
            this.state.currentJob.jobCategory,
            this.state.currentJob.jobCity,
            this.state.currentJob.jobDateCreated,
            this.state.currentJob.jobDateExpiration,
            this.state.currentJob.jobDescription,
            this.state.currentJob.jobRequirements,
            this.state.currentJob.jobResponsibilities,
            this.state.currentJob.jobStatus,
            this.state.currentJob.jobTitle,
            this.state.currentJob.salary

        ).then(
            response => {
                this.setState(prevState => ({
                currentExperience: {
                    ...prevState.currentJob,
                },
                successful: true
                }));
                this.props.history.push("/management/hruser");
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
              {(this.state.userReady) && (this.state.currentJob) ?
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
                                            <h5 className="card-title">Edit job details</h5>
                                                <Form onSubmit={this.handleJobDetails} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                        <h2 className="card-title">Position name</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobTitle" 
                                                            placeholder="Position name" 
                                                            onChange={this.onChangeJobTitle}
                                                            value={this.state.currentJob.jobTitle}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Category</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobCategory" 
                                                            placeholder="Category" 
                                                            onChange={this.onChangeJobCategory}
                                                            value={this.state.currentJob.jobCategory}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                         <h2 className="card-title">Contract</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="contractType" 
                                                            placeholder="Contract" 
                                                            onChange={this.onChangeContractType}
                                                            value={this.state.currentJob.contractType}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Salary</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="salary" 
                                                            placeholder="Salary" 
                                                            onChange={this.onChangeSalary}
                                                            value={this.state.currentJob.salary}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">City</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobCity" 
                                                            placeholder="City" 
                                                            onChange={this.onChangeJobCity}
                                                            value={this.state.currentJob.jobCity}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Description</h2>
                                                            <Textarea 
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobDescription" 
                                                            placeholder="Description" 
                                                            onChange={this.onChangeJobDescription}
                                                            value={this.state.currentJob.jobDescription}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Responsibilities </h2>
                                                            <Textarea 
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobResponsibilities" 
                                                            placeholder="Responsibilities" 
                                                            onChange={this.onChangeJobResponsibilities}
                                                            value={this.state.currentJob.jobResponsibilities}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Requirements </h2>
                                                            <Textarea 
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobRequirements" 
                                                            placeholder="Requirements" 
                                                            onChange={this.onChangeJobRequirements}
                                                            value={this.state.currentJob.jobRequirements}
                                                            />
                                                        </div>
                                                        
                                                        <div className="form-input">
                                                            <h2 className="card-title">Date created</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="date" 
                                                            name="jobDateCreated" 
                                                            onChange={this.onChangeJobDateCreated}
                                                            value={this.state.currentJob.jobDateCreated}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                            <h2 className="card-title">Deadline date</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="date" 
                                                            name="jobDateExpiration" 
                                                            onChange={this.onChangeJobDateExpiration}
                                                            value={this.state.currentJob.jobDateExpiration}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                         <h2 className="card-title">Status</h2>
                                                            <Input 
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobStatus" 
                                                            placeholder="Status" 
                                                            onChange={this.onChangeJobStatus}
                                                            value={this.state.currentJob.jobStatus}
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
               </div>:null}
            </section>
        );
    }
}
