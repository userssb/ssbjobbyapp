import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    title,
    location,
    jobDescription,
    companyLogoUrl,
    employmentType,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails
  console.log('id : ', id)
  return (
    <li className="list-item">
      <Link to={`/jobs/${id}`} className="test">
        <div className="job-item-cont">
          <div className="logo-title-cont">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating-cont">
              <p className="title">{title}</p>
              <div className="rating-cont">
                <AiFillStar fill="#fbbf24" />
                <p className="number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-sal-cont">
            <div className="location-type-cont">
              <div className="location-cont">
                <MdLocationOn fill="white" />
                <p className="loc-type">{location}</p>
              </div>
              <div className="type-cont">
                <BsBriefcaseFill fill="white" />
                <p className="loc-type">{employmentType}</p>
              </div>
            </div>
            <div className="package">
              <p className="pack">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="big-line" />
          <div className="desc-cont">
            <h3 className="description">Description</h3>
            <p className="job-desc">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
