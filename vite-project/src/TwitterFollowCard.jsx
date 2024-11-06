import { useState } from "react"

export function TwitterFollowCard ({ formatUserName, userName, name, initialIsFollowing }) {

const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

const handleClick = () => {
    setIsFollowing(!isFollowing)
}
const text = isFollowing ? 'Siguiendo' : 'Seguir'
const buttonClassName = isFollowing
? 'tw-followCard-button is-following'
: 'tw-followCard-button'

    return(
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img className="tw-followCard-avatar"
        alt="avatar de alguien" src={`https://unavatar.io/${userName}`}></img>
        <div className="tw-followCard-info">
          <strong>{name}</strong>
        <span>{formatUserName(userName)}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
            {text}
        </button>
      </aside>
    </article>
    )
}