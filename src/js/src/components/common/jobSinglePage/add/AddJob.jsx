import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import ManagementService from "../../../../services/management.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};




const currentUser = AuthService.getCurrentUser();

export default class AddJob extends Component {

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
            successful: false,
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
            message: ''
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // job details

      onChangeContractType(e) {
        this.setState({
          contractType: e.target.value
        });
      }

      onChangeJobCategory(e) {
        this.setState({
          jobCategory: e.target.value
        });
      }

      onChangeJobCity(e) {
        this.setState({
          jobCity: e.target.value
        });
      }

      onChangeJobDateCreated(e) {
        this.setState({
            jobDateCreated: e.target.value
        });
      }

      onChangeJobDateExpiration(e) {
        this.setState({
            jobDateExpiration: e.target.value
        });
      }

        onChangeJobDescription(e) {
          this.setState({
              jobDescription: e.target.value
          });
        }

        onChangeJobResponsibilities(e) {
          this.setState({
              jobResponsibilities: e.target.value
          });
        }
      
        onChangeJobRequirements(e) {
          this.setState({
              jobRequirements: e.target.value
          });
        }


      onChangeJobTitle(e) {
        this.setState({
          jobTitle: e.target.value
        });
      }
    
    
      onChangeJobStatus(e) {
        this.setState({
          jobStatus: e.target.value
        });
      }

      onChangeSalary(e) {
        this.setState({
          salary: e.target.value
        });
      }
    
     
      handleJobDetails(e) {
        e.preventDefault();
    
        this.setState({
          successful: false,
          message: ""
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          ManagementService.addNewJob(
            this.state.contractType,
            this.state.jobCategory,
            this.state.jobCity,
            this.state.jobDateCreated,
            this.state.jobDateExpiration,
            this.state.jobDescription,
            this.state.jobRequirements,
            this.state.jobResponsibilities,
            this.state.jobStatus,
            this.state.jobTitle,
            this.state.salary

          ).then(
            response => {
              
              this.setState({
                successful: true,
                message: response
              });
              this.props.history.push("/management/hruser");
              window.location.reload();
              console.log(JSON.stringify("data from AddJob componenet " + response));
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
                                            <h5 className="card-title">Add new job </h5>
                                                <Form onSubmit={this.handleJobDetails} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Position name</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobTitle" 
                                                            placeholder="Position name" 
                                                            onChange={this.onChangeJobTitle}
                                                            value={this.state.jobTitle}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Category</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobCategory" 
                                                            placeholder="Category" 
                                                            onChange={this.onChangeJobCategory}
                                                            value={this.state.jobCategory}
                                                            validations={[required]}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Contract</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="contractType" 
                                                            placeholder="Contract" 
                                                            onChange={this.onChangeContractType}
                                                            value={this.state.contractType}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Salary</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="salary" 
                                                            placeholder="Salary" 
                                                            onChange={this.onChangeSalary}
                                                            value={this.state.salary}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">City</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobCity" 
                                                            placeholder="City" 
                                                            onChange={this.onChangeJobCity}
                                                            value={this.state.jobCity}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Description</h2>
                                                            <Textarea required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobDescription" 
                                                            placeholder="Description" 
                                                            onChange={this.onChangeJobDescription}
                                                            value={this.state.jobDescription}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Responsibilities </h2>
                                                            <Textarea required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobResponsibilities" 
                                                            placeholder="Responsibilities" 
                                                            onChange={this.onChangeJobResponsibilities}
                                                            value={this.state.jobResponsibilities}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Requirements </h2>
                                                            <Textarea required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="jobRequirements" 
                                                            placeholder="Requirements" 
                                                            onChange={this.onChangeJobRequirements}
                                                            value={this.state.jobRequirements}
                                                            validations={[required]}
                                                            />
                                                        </div>
                                                        
                                                        <div className="form-input">
                                                            <h2 className="card-title">Date created</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="date" 
                                                            name="jobDateCreated" 
                                                            onChange={this.onChangeJobDateCreated}
                                                            value={this.state.jobDateCreated}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                            <h2 className="card-title">Deadline date</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="date" 
                                                            name="jobDateExpiration" 
                                                            onChange={this.onChangeJobDateExpiration}
                                                            value={this.state.jobDateExpiration}
                                                            validations={[required]}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Status</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="jobStatus" 
                                                            placeholder="Status" 
                                                            onChange={this.onChangeJobStatus}
                                                            value={this.state.jobStatus}
                                                            validations={[required]}
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
