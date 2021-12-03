import React from 'react'

export default function Error(props) {
    return (
        <div>
            <h1>Oh dear, something isn't quite right.</h1>
            <p>Try again by refreshing the page. Sorry for the inconvinience</p>
            <p>If you know the guy who made this, whisper to him: {props.error}</p>
        </div>
    )
}
