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
                <div>
                <label htmlFor="title">Title : </label>
                <textarea name="title" id="title" cols="30" rows="5" className='w-full min-h-8 bg-gray-100'></textarea>
                </div>
                <div>
                  <label htmlFor="description">Description : </label>
                  <textarea name=" description" id=" description" cols="30" rows="10" className='w-full min-h-8 bg-gray-100'></textarea>
                </div>
                <div>
                  <span>Color:</span>
                  <div className='flex items-center gap-5'>
                    <input type="radio" name="colorCode" id="#be123c" />
                    <label htmlFor="#be123c">
                      <div className='h-4 w-4 rounded-full bg-[#be123c]'></div>
                    </label>
                    <input type="radio" name="colorCode" id="#2563eb" />
                    <label htmlFor="#2563eb">
                      <div className='h-4 w-4 rounded-full bg-[#2563eb]'></div>
                    </label>
                    <input type="radio" name="colorCode" id="#059669" />
                    <label htmlFor="#059669">
                      <div className='h-4 w-4 rounded-full bg-[#059669]'></div>
                    </label>
                  </div>
                </div>
                <div className='mb-10 mt-5'>
                  <button type="submit">Create</button>
                </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default CreateNote