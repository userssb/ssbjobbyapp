import './index.css'

const SkillsCard = props => {
  const {skills} = props
  const {name, imageUrl} = skills
  return (
    <li className="skill">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default SkillsCard
