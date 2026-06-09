import React, {  useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props) =>{
    
  const[articles , setarticles] = useState([])
  const[loading , setloading] = useState(true)
  const[page , setpage] = useState(1)
  const[totalResults , settotalResults] = useState(0)

  const captailize =(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updatenews = async()=>{
      console.log("API KEY:", props.apikey);
      props.setprogress(10);
      const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=15`;
        setloading(true)
        let data = await fetch(url);
        let parseData = await data.json();
        props.setprogress(70);
        setarticles(parseData.articles)
        settotalResults(parseData.totalResults)
        setloading(false)
        props.setprogress(100);
    };
    
    useEffect(() => {
      document.title = `${captailize(props.category)} - NewsMonkey`;
      updatenews();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const fetchMoreData = async ()=>{
      try{
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=15`;
        setpage(prev => prev + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setarticles(articles.concat(parseData.articles || [] ))
        settotalResults(parseData.totalResults)
      }catch(error){
        console.error("error fetching more news",error);
      }
    }
  return (
    <>
      <h2 className='text-center' style={{margin:'35px 0px' , marginTop:'90px'}}>NewsMonkey - {captailize(props.category)} Headlines</h2>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}>
      <div className='container'>
          <div className='row' >
            {articles.map((element)=> {
                return <div className='col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center' key={element.url}>
              <NewsItem title={element.title?element.title:""} source={element.source.name}
              description={element.description?element.description:""}
              imageurl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/6fc8/live/c0f5abd0-d2fd-11f0-8c06-f5d460985095.jpg"} url={element.url}
              author={element.author}  date={element.publishedAt} />
          </div>
          })}
        </div>
      </div>
      
      </InfiniteScroll>
    </>
  )
}

  News.defaultProps = {
    category:'general'
  }
  News.propTypes = { 
    category:PropTypes.string     
  }

export default News
