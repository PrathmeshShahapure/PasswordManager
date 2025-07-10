import {Component} from 'react'
import {v4} from 'uuid'
import Makelist from './components/Makelist'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordList: [],
      website: '',
      username: '',
      password: '',
      showPasswords: '',
      searchVal: '',
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    if (website && username && password) {
      const newList = {id: v4(), website, username, password}
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newList],
        website: '',
        password: '',
        username: '',
      }))
    } else {
      alert(' Please fill all the fields')
    }
  }

  toggelShowPassword = () => {
    this.setState(prev => ({showPasswords: !prev.showPasswords}))
  }

  searchValHandler = event => {
    this.setState({searchVal: event.target.value})
  }

  checkForSearch = searchVal => {
    const {passwordList} = this.state
    if (searchVal) {
      return passwordList.filter(each =>
        each.website.toLowerCase().includes(searchVal.toLowerCase()),
      )
    }

    return passwordList
  }

  handleDelete = id => {
    console.log(id)
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {username, showPasswords, searchVal} = this.state
    const {website, password} = this.state
    console.log(searchVal)
    const filteredList = this.checkForSearch(searchVal)
    const countPasswords = filteredList.length
    return (
      <div className="mainContainer">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="sections">
          <div className="addPasswordSection">
            <div className="formDiv">
              <form onSubmit={this.handleSubmit}>
                <h3 className="heading">Add New Password</h3>
                <label className="labell">
                  <img
                    className="labelImg"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    onChange={this.handleChange}
                    name="website"
                    value={website}
                    className="labelInput"
                    type="text"
                    placeholder="Enter Website"
                  />
                </label>
                <label className="labell">
                  <img
                    className="labelImg"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    onChange={this.handleChange}
                    name="username"
                    value={username}
                    className="labelInput"
                    type="text"
                    placeholder="Enter Username"
                  />
                </label>
                <label className="labell">
                  <img
                    className="labelImg"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    onChange={this.handleChange}
                    name="password"
                    value={password}
                    className="labelInput"
                    type="password"
                    placeholder="Enter Password"
                  />
                </label>
                <div className="alignRight">
                  <button className="addPasswordBtn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>

            <div className="imgDiv">
              <img
                className="passwordManagerImg"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="showPasswordSection">
            <div className="passwordNav">
              <div>
                <h2 className="passwordHeading">Your Passwords</h2>
                <p className="countPara">{countPasswords}</p>
              </div>
              <label className="labell">
                <img
                  className="labelImg"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  onChange={this.searchValHandler}
                  value={searchVal}
                  className="labelInput"
                  type="search"
                  placeholder="Search"
                />
              </label>
            </div>
            <hr />
            <div className="alignRightCheckbox">
              <label className="labell">
                <input
                  onChange={this.toggelShowPassword}
                  className="checkInp"
                  type="checkbox"
                />
                <p className="checkboxPara">Show Passwords </p>
              </label>
            </div>
            <ul>
              {countPasswords === 0 ? (
                <div className="noPasswordDiv">
                  <img
                    className="noPasswordImg"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                  />
                  <p>No Passwords</p>
                </div>
              ) : (
                filteredList.map(each => (
                  <Makelist
                    key={each.id}
                    details={{...each, showPasswords}}
                    handleDelete={this.handleDelete}
                    countPasswords={countPasswords}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
