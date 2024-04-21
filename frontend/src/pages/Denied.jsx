import React from 'react'
import {Link} from 'react-router-dom'
function Denied() {
  return (
    <section>
        <div>
            <h1>Accessed denied</h1>
            <Link
            to={"/"}>Back to home</Link>
        </div>
    </section>
  )
}

export default Denied