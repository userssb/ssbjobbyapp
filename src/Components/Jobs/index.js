import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    searchInput: '',
    jobsData: [],
    employmentType: [],
    salary: '',
    profileData: {},
    checkedList: [],
    res: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileData()
  }

  getProfileData = async () => {
    const url = `https://apis.ccbp.in/profile`
    const jwtToken = Cookies.get('jobby_jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response2 = await fetch(url, options)
    const proData = await response2.json()
    // console.log(data)
    if (response2.ok === true) {
      //   console.log('proData==}', proData)
      const updatedProfileData = {
        name: proData.profile_details.name,
        profileImageUrl: proData.profile_details.profile_image_url,
        shortBio: proData.profile_details.short_bio,
      }
      //   console.log('updatedProfileData : ', updatedProfileData)
      this.setState({profileData: updatedProfileData})
    }
  }

  onChangeEmploymentType = event => {
    const {checkedList} = this.state
    const typeName = event.target.value
    if (event.target.checked === true) {
      checkedList.push(typeName)
    } else {
      const index = checkedList.indexOf(typeName)
      checkedList.splice(index, 1)
    }
    this.setState({employmentType: checkedList}, this.getJobs)
    console.log('checkedList : ', checkedList)
  }

  //   onChangeEmploymentType = event => {
  //     const type = event.target.value
  //     let {res} = this.state
  //     const {checkedList} = this.state
  //     // let res = []
  //     if (checkedList.includes(type)) {
  //       res = checkedList.filter(item => item !== type)
  //     } else {
  //       checkedList.push(type)
  //       //   console.log(employmentType)
  //     }
  //     this.setState({employmentType: checkedList}, this.getJobs)
  //   }

  //   onChangeSearchInput = event => {
  //     this.setState({searchInput: event.target.value}, this.getJobs)
  //   }

  /*  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    // const t = employmentType.concat(',', event.target.value)
    const s = employmentType.concat(event.target.value)
    // this.setState(
    //   prevState => ({
    //     employmentType: [...prevState.employmentType, event.target.value],
    //   }),
    //   this.getJobs,
    // )
    if (event.target.checked === true) {
      this.setState({employmentType: s}, this.getJobs)
    }
  }  */

  onChangeSalary = event => {
    this.setState({salary: event.target.value}, this.getJobs)
  }

  getJobs = async () => {
    const {employmentType, searchInput, salary} = this.state
    // console.log('checkedList=>', checkedList)
    // console.log('salary=>', salary)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salary}&search=${searchInput}`
    const jwtToken = Cookies.get('jobby_jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({jobsData: updatedData})
      //   console.log(updatedData)
    }
  }

  renderLeftCont = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="left-cont">
        <div className="img-cont">
          <div className="man-img-cont">
            <img src={profileImageUrl} alt={name} className="man-img" />
          </div>
          <h1 className="profile-name">{name}</h1>
          <p className="profile-desc">{shortBio}</p>
        </div>
        <hr className="horizontal-line" />
        {this.renderEmploymentTypes()}
        <hr className="horizontal-line" />
        {this.renderSalaryRange()}
      </div>
    )
  }

  jobsList = () => {
    const {jobsData} = this.state
    return (
      <ul>
        {jobsData.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderRightCont = () => {
    const {searchInput} = this.state
    return (
      <div>
        <div className="search-cont">
          <input
            type="search"
            className="search-bar"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <div className="search-icon-cont">
            <AiOutlineSearch fill="white" onClick={this.getJobs} />
          </div>
        </div>
        <div>{this.jobsList()}</div>
      </div>
    )
  }

  renderSalaryRange = () => (
    <div className="salary-range-cont">
      <h1 className="salary-range-heading">Salary Range</h1>
      <div className="radio-cont">
        <input
          type="radio"
          id="ten"
          name="salary"
          value="1000000"
          onChange={this.onChangeSalary}
        />
        <label htmlFor="ten" className="sal-range">
          10 LPA and above
        </label>
      </div>
      <div className="radio-cont">
        <input
          type="radio"
          id="twenty"
          name="salary"
          value="2000000"
          onChange={this.onChangeSalary}
        />
        <label htmlFor="twenty" className="sal-range">
          20 LPA and above
        </label>
      </div>
      <div className="radio-cont">
        <input
          type="radio"
          id="thirty"
          name="salary"
          value="3000000"
          onChange={this.onChangeSalary}
        />
        <label htmlFor="thirty" className="sal-range">
          30 LPA and above
        </label>
      </div>
      <div className="radio-cont">
        <input
          type="radio"
          id="forty"
          name="salary"
          value="4000000"
          onChange={this.onChangeSalary}
        />
        <label htmlFor="forty" className="sal-range">
          40 LPA and above
        </label>
      </div>
    </div>
  )

  renderEmploymentTypes = () => (
    <div className="employment-types-cont">
      <h1 className="employment-types-heading">Type of Employment</h1>
      <div className="check-cont">
        <input
          type="checkbox"
          id="fulltime"
          value="FULLTIME"
          onChange={this.onChangeEmploymentType}
        />
        <label htmlFor="fulltime" className="emp-type">
          Full Time
        </label>
      </div>
      <div className="check-cont">
        <input
          type="checkbox"
          id="part"
          value="PARTTIME"
          onChange={this.onChangeEmploymentType}
        />
        <label htmlFor="part" className="emp-type">
          Part Time
        </label>
      </div>
      <div className="check-cont">
        <input
          type="checkbox"
          id="free"
          value="FREELANCE"
          onChange={this.onChangeEmploymentType}
        />
        <label htmlFor="free" className="emp-type">
          Freelance
        </label>
      </div>
      <div className="check-cont">
        <input
          type="checkbox"
          id="intern"
          value="INTERNSHIP"
          onChange={this.onChangeEmploymentType}
        />
        <label htmlFor="intern" className="emp-type">
          Internship
        </label>
      </div>
    </div>
  )

  render() {
    return (
      <>
        <div className="bg-cont">
          <div className="app-cont">
            <div className="left-cont">{this.renderLeftCont()}</div>
            <div className="right-cont">{this.renderRightCont()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
