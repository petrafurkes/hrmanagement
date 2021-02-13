import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import ManagementService from "../../../../services/management.service";



const options = [
  'People & Organization', 
  'Customer Operations & Success', 
  'IT & Support Engineering',
  'Sales',
  'Product'
];
const defaultOption = options[0];
const currentUser = AuthService.getCurrentUser();

export default class AddEmploymentDetails extends Component {

    constructor(props) {
        super(props);
        this.handleEmploymentDetails = this.handleEmploymentDetails.bind(this);
        this.onChangeOfficeEmail = this.onChangeOfficeEmail.bind(this);
        this.onChangeOfficePhoneNumber = this.onChangeOfficePhoneNumber.bind(this);
        this.onChangeOfficeMobileNumber = this.onChangeOfficeMobileNumber.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeOfficeLocation = this.onChangeOfficeLocation.bind(this);

    
        this.state = {
            successful: false,
            officeEmail: '',
            officePhoneNumber: '',
            officeMobileNumber: '',
            position: '',
            department: '',
            salary: '',
            startDate: '',
            endDate: '',
            officeLocation: '',
            message: ''
            
        };
    }
    
      componentDidMount() {
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

      // job details

      onChangeOfficeEmail(e) {
        this.setState({
          officeEmail: e.target.value
        });
      }

      onChangeOfficePhoneNumber(e) {
        this.setState({
          officePhoneNumber: e.target.value
        });
      }

      onChangeOfficeMobileNumber(e) {
        this.setState({
          officeMobileNumber: e.target.value
        });
      }

      onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
      }

      onChangeDepartment(e) {
        this.setState({
            department: e.target.value
        });
      }

      onChangeSalary(e) {
          this.setState({
              salary: e.target.value
          });
        }

        onChangeStartDate(e) {
          this.setState({
              startDate: e.target.value
          });
        }
  
        onChangeEndDate(e) {
          this.setState({
              endDate: e.target.value
          });
        }
  
        onChangeOfficeLocation(e) {
            this.setState({
                officeLocation: e.target.value
            });
          }

        
     
      handleEmploymentDetails(e) {
        e.preventDefault();
    
        this.setState({
          successful: false,
          message: ""
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          ManagementService.addEmploymentDetails(
            this.state.officeEmail,
            this.state.officePhoneNumber,
            this.state.officeMobileNumber,
            this.state.position,
            this.state.department,
            this.state.salary,
            this.state.startDate,
            this.state.endDate,
            this.state.officeLocation
          ).then(
            response => {
              
              this.setState({
                successful: true,
                message: response
              });
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
                                            <h5 className="card-title">Employment details </h5>
                                                <Form onSubmit={this.handleNewEmployee} className="register-form"
                                                    ref={d => {
                                                        this.form = d;
                                                    }}>
                                                    {!this.state.successful && (
                                                    <div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Office email</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="officeEmail" 
                                                            placeholder="Office email" 
                                                            onChange={this.onChangeOfficeEmail}
                                                            value={this.state.officeEmail}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Office phone number</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="officePhoneNumber" 
                                                            placeholder="Office phone number" 
                                                            onChange={this.onChangeOfficePhoneNumber}
                                                            value={this.state.officePhoneNumber}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Office mobile number</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="officeMobileNumber" 
                                                            placeholder="Office mobile number" 
                                                            onChange={this.onChangeOfficeMobileNumber}
                                                            value={this.state.officeMobileNumber}
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                            <h2 className="card-title">Position</h2>
                                                            <Input required
                                                            className="antt-input"
                                                            type="text" 
                                                            name="position" 
                                                            onChange={this.onChangePosition}
                                                            value={this.state.position}
                                                            placeholder="Position"
                                                            />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Department</h2>
                                                          <Dropdown options={options} 
                                                          onChange={this._onSelect} 
                                                          value={defaultOption} 
                                                          name="department" 
                                                          placeholder="Select an option" 
                                                          />
                                                        </div>

                                                        <div className="form-input">
                                                          <h2 className="card-title">Salary</h2>
                                                            <Input required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="salary" 
                                                            placeholder="Salary" 
                                                            onChange={this.onChangeSalary}
                                                            value={this.state.salary}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Start date</h2>
                                                            <Input required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="date" 
                                                            name="startDate" 
                                                            onChange={this.onChangeStartDate}
                                                            value={this.state.startDate}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">End date</h2>
                                                            <Input required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="date" 
                                                            name="endDate" 
                                                            onChange={this.onChangeEndDate}
                                                            value={this.state.endDate}
                                                            />
                                                        </div>
                                                        <div className="form-input">
                                                          <h2 className="card-title">Office location</h2>
                                                            <Input required
                                                            className="antt-input text__StyledTextField-sc-1iy2av3-0 kxvbij" 
                                                            spellCheck="false"
                                                            type="text" 
                                                            name="officeLocation" 
                                                            placeholder="Office location" 
                                                            onChange={this.onChangeOfficeLocation}
                                                            value={this.state.officeLocation}
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
