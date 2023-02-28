import Header from '../Header'
import './index.css'

const Home = props => {
  const {history} = props
  const findJobs = () => {
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="bg-cont">
        <div className="title-btn-cont">
          <h1>
            Find The Job That <br /> Fits Your Life
          </h1>
          <p>
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button type="button" className="btn-find-jobs" onClick={findJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
