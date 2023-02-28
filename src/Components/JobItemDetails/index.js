import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import LifeAtCompanyCard from '../LifeAtCompanyCard'
import SkillsCard from '../SkillsCard'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
    console.log('component')
  }

  getFormattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    })),
    title: data.title,
  })

  getFormattedSimilarData = data => ({
    id: data.id,
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jobby_jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log('job name : ', data)
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      //   console.log('updatedData :', updatedData)
      //   console.log('updatedSimilarData : ', updatedSimilarData)
      this.setState({
        jobItemList: updatedData,
        similarJobsList: updatedSimilarData,
      })
    }
  }

  renderJobDetails = () => {
    const {jobItemList} = this.state
    const {
      title,
      jobDescription,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
    } = jobItemList
    console.log('jobItemList', jobItemList.lifeAtCompany)

    // const {description, imageUrl} = lifeAtCompany
    // const {name, imageUrl2} = skills

    return (
      <div className="bg-cont">
        <div className="item-cont">
          <div className="logo-title-rating-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div className="title-rating-cont">
              <p className="title">{title}</p>
              <div className="rating-cont">
                <AiFillStar fill="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="loc-type-sal-cont">
            <div className="location-type-cont">
              <div className="loc-cont">
                <MdLocationOn fill="white" />
                <p className="location">{location}</p>
              </div>
              <div className="type-cont">
                <BsBriefcaseFill fill="white" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p className="sal">{packagePerAnnum}</p>
          </div>
          <hr width="80%" />
          <div className="desc-cont">
            <div className="head-link-cont">
              <h1 className="desc-head">Description</h1>
            </div>
            <p className="job-desc">{jobDescription}</p>
          </div>
          <div className="skills-cont">
            <h1 className="skills-head">Skills</h1>
            <div className="skill-name-cont">
              {/* <img src={imageUrl2} alt="" className="skill-image" />
              <p className="skill-name">{name}</p> */}
              {/* {skills.map(eachSkill => (
                <SkillsCard skills={eachSkill} />
              ))} */}
            </div>
            {/* <LifeAtCompanyCard lifeAtCompany={lifeAtCompany} /> */}
            {/*  <div className="life-cont">
              <div className="desc-cont">
                <h1 className="heading">Life at Company</h1>
                <p className="life-desc">{description}</p>
              </div>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-image"
              />
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  //   renderJobDetails = () => (
  //     <div>
  //       <h1>Job Item Details Page</h1>
  //     </div>
  //   )

  render() {
    return <>{this.renderJobDetails()}</>
  }
}
export default JobItemDetails
