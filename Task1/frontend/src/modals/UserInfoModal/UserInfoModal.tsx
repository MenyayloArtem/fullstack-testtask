import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import "./UserInfoModal.scss"
import {ReactComponent as CloseIcon} from "../../assets/icons/close.svg";
import User from "../../shared/types/User";

interface Props {
  open : boolean,
  onClose : Function,
  user : User
}

const UserInfoModal : React.FC<Props> = ({open, onClose, user}) => {
    const [isOpen, setIsOpen] = useState(open)

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
      setIsOpen(open)
    }, [open])

    return <Modal className="basicModal" isOpen={isOpen} onRequestClose={handleClose} appElement={null as any}>
        <div className="popup">
        <div className="popup__body">
          <div className="popup__top">
            <div className="popup__title">{user.name}</div>
            <CloseIcon className="popup__close" onClick={handleClose}/>
          </div>

          <div className="popup__main">
            <div className="info-blocks">
              <div className="info-block">
                <div className="info-block__label">Телефон:</div>
                <div className="info-block__value">{user.phone}</div>
              </div>

              <div className="info-block">
                <div className="info-block__label">Почта:</div>
                <div className="info-block__value">{user.email}</div>
              </div>

              <div className="info-block">
                <div className="info-block__label">Дата приёма:</div>
                <div className="info-block__value">{user.hire_date}</div>
              </div>

              <div className="info-block">
                <div className="info-block__label">Адрес:</div>
                <div className="info-block__value">{user.address}</div>
              </div>

              <div className="info-block">
                <div className="info-block__label">Подразделение:</div>
                <div className="info-block__value">
                  {user.department}
                </div>
              </div>
            </div>
          </div>

          <div className="popup__bottom">
            <div className="info-block col">
              <div className="info-block__label">Дополнительная информация:</div>
              <div className="info-block__value">
                {user.position_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
}

export default UserInfoModal