import React from 'react'
import Navbar from '../components/Navbar'
function CreateNote() {
  return (
    <>
    <Navbar/>
    <section>
        <div className='px-5'>
            <h1>add note</h1>
            <form noValidate>
                <label htmlFor="title">Title : </label>
                <textarea name="title" id="" cols="30" rows="5" className='w-full min-h-8 bg-gray-100'></textarea>

            </form>
        </div>
    </section>
    </>
  )
}

export default CreateNote