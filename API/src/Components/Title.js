import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'

export default function Title() {
    return (
        <div className="logo-wrapper screen">
          <FontAwesomeIcon className="bitcoin-icon animation-fade" icon={faBitcoin}/>
          <h1 className="animation-fade">Crypto Checker</h1>
        </div>
    )
}
