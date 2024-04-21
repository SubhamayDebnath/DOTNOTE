import React from 'react'
import {Link} from 'react-router-dom'
function NotFoundPage() {
  return (
    <section>
        <div>
            <h1>Page Not Found</h1>
            <Link to={"/"}>Back to Home</Link>
        </div>
    </section>
  )
}

export default NotFoundPage