import React from "react"
import "./UserCard.scss"
import {ReactComponent as PhoneIcon} from "../../assets/icons/phone.svg";
import {ReactComponent as EmailIcon} from "../../assets/icons/email.svg";
import User from "../../shared/types/User";

interface Props {
  user : User,
  onClick : (user: User) => void
}

const UserCard : React.FC<Props> = ({ user, onClick }) => {
    return <div className="card" onClick={() => onClick(user)}>
    <div className="card__title">{user.name}</div>
    <div className="card__info">
      <div className="card__info-item">
        <PhoneIcon />
        {user.phone}
      </div>
      <div className="card__info-item">
        <EmailIcon />
        {user.email}
      </div>
    </div>
  </div>
}

export default UserCard