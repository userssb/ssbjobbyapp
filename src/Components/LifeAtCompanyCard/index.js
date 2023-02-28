import './index.css'

const LifeAtCompanyCard = props => {
  const {lifeAtCompany} = props
  const {description, imageUrl} = lifeAtCompany
  return (
    <div className="life-cont">
      <div className="desc-cont">
        <h1 className="heading">Life at Company</h1>
        <p className="life-desc">{description}</p>
      </div>
      <img src={imageUrl} alt="life at company" className="life-at-image" />
    </div>
  )
}
export default LifeAtCompanyCard
