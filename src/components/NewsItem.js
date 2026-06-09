import React from 'react'

const NewsItem =(props)=> {
  let {title , description , imageurl , url , author , date , source} = props; 
  return (
    <div>
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"80%" , zIndex:1}}>
          {source}
        </span>
          <img src={imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className='card_text'><small className='text-muted'>
                By {author?author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
              <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
      </div>
    </div>
  )
}

export default NewsItem
