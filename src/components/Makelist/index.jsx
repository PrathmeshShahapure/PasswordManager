import './index.css'
import {useRef} from 'react'

const Makelist = props => {
  const randomColorList = [
    '#9ba9eb',
    '#4ade80',
    '#f59e0b',
    '#b91c1c',
    '#10b981',
    'black',
    '#f87171',
    '4ade80',
  ]
  const colorref = useRef(randomColorList[Math.floor(Math.random() * 8)])
  const {details, handleDelete, countPasswords} = props
  // eslint-disable-next-line
  const {website, username, password, showPasswords, id} = details

  const callHandleDelete = () => {
    handleDelete(id)
  }

  return (
    <li>
      <p className="weblogo" style={{backgroundColor: colorref.current}}>
        {website[0].toUpperCase()}
      </p>
      <div className="detailsDiv">
        <div>
          <p className="padmarzero">{website}</p>
          <p className="padmarzero">{username}</p>
          {showPasswords || countPasswords.length === 0 ? (
            <p className="padmarzero"> {password} </p>
          ) : (
            <img
              className="startImg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button
          data-testid="delete"
          onClick={callHandleDelete}
          className="deletebtn"
          type="button"
        >
          <img
            className="imgDelete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default Makelist
