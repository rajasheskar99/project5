import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    barData: [],
    vaccineAge: [],
    vaccineGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        vaccinationData: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {
        vaccinationData,
        vaccinationByAge,
        vaccinationByGender,
      } = updatedData
      const vaccineData = vaccinationData.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      this.setState({
        barData: vaccineData,
        vaccineAge: vaccinationByAge,
        vaccineGender: vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-sec">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessfully = () => {
    const {barData, vaccineAge, vaccineGender} = this.state
    return (
      <div className="bg-container">
        <div className="logo-sec">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-text">Co-WIN</p>
        </div>
        <h1 className="title">CoWIN Vaccination in India</h1>
        <VaccinationCoverage barData={barData} />
        <VaccinationByGender vaccineGender={vaccineGender} />
        <VaccinationByAge vaccineAge={vaccineAge} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="bg-contain">
      <div className="logo-sec">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="logo"
        />
        <p className="logo-text">Co-WIN</p>
      </div>
      <h1 className="title">CoWIN Vaccination in India</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="fail-img"
        />
        <h1>Something went wrong</h1>
      </div>
    </div>
  )

  renderPrimeDeals = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessfully()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPrimeDeals()}</>
  }
}
export default CowinDashboard
