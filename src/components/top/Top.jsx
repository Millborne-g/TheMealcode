import React, {useState}from 'react';
import './top.css';

import bg_topright from '../../assets/bg_topright.svg';
import bg_botright from '../../assets/bg_botright.svg';
import bg_botleft from '../../assets/bg_botleft.svg';
import bg_topleft from '../../assets/bg_topleft.svg';
import CircularProgress from '@mui/material/CircularProgress';
const Top = () => {

  const [text, settext] = useState('');
  const [search, setsearch] = useState(false);
  const [forloading, setforloading] = useState(false);
  const [mealFound, setmealFound] = useState(true);
  const pageScroll = () => {
    window.scrollBy(0,1000);
  }

  
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    setsearch(true);
    setforloading(true);
    searchEngridient(text);
    

    
  }

  const searchEngridient = (string) =>{
    
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${string}`)
    .then((response) => response.json())
    .then((data) =>{

      document.getElementById('meal_results').innerHTML = '';
    
      if(data.meals){
        setmealFound(true);
        data.meals.forEach(meal => {

          let html = "";
          
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
          .then((responses) => responses.json())
          .then((datas) =>{
            
            html = `
              <div className='meal' id='meal'>
                <div className='meal_description' id='meal_description'>
                  <span className='meal_details' id='meal_details'>${meal.strMeal}</span> <br />
            
                  
                </div>
                <div className='meal_image_container' id='meal_image_container'>
                  <div className='meal_image_container_inner' id='meal_image_container_inner'>
                  
                    <img className='meal_image' id='meal_image' src=${meal.strMealThumb} alt="" />
                  </div>
                </div>

                <div className='meal_details_btn_container' id='meal_details_btn_container'>
                  <a href="${datas.meals[0].strSource}" target="_blank"><button className='meal_details_btn' id='meal_details_btn'>How to Prepare</button></a>
                  <a href="${datas.meals[0].strYoutube}" target="_blank"><button className='meal_details_btn' id='meal_details_btn'>Watch video</button></a>
        
                </div>

                
                
                
                      
        
              </div>
            `
            document.getElementById('meal_results').innerHTML += html;
          });
          
        });

      }else{
        setmealFound(false);
      }
      setTimeout(() => {pageScroll()  }, 300);
      setforloading(false);
    });
    

  }

  
  return (
    <div className='top' id='Top'>
      <div className='top_search'>
        <div className='top_inner'>
            {/*<div className='top_bg_image_cover'></div>*/}
            
            <div className='top_contents'>
              <div className='top_contents_inner'>
                <div className='top_headline_container'>
                  <span className='top_headline'>Explore new recipes</span>
                  
                </div>
                {!forloading &&
                  <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <input value={text} onChange={(e) =>settext(e.target.value)} className='search_textbox' type="text" name="" id="search_textbox" placeholder='Enter an ingredient here'/>
                    <button className='search_btn' onClick={(e) => handleSubmit(e)} href="#top_result"> <span className='search_icon'><i className="fa-solid fa-magnifying-glass"></i></span> </button>
                  </form>
                }

                {forloading &&
                  <CircularProgress/>
                }
                
                <div className='qoute_container'></div>
                <span className='qoute'>A BAD DAY WITH A MEAL IS BETTER THAN A GOOD DAY WITHOUT IT</span>

              </div>
              

            </div>
            
            <img className='bg_topright' src={bg_topright} alt="" />
            <img className='bg_botright' src={bg_botright} alt="" />
            <img className='bg_botleft' src={bg_botleft} alt="" />
            <img className='bg_topleft' src={bg_topleft} alt="" />
        </div>   
      </div>
    
      {search &&
        <div className='top_result' id='top_result'>
          <div className='top_result_inner'>
            <div className='your_results_container'>
              <span className='your_results'>Search Results:</span>
              
            </div>
            

            <div className='meal_results' id='meal_results'>
              
            </div>


            

          </div>

        </div>
      
      }

      {!mealFound &&
        <div className='meal_not_found_container'>
          <span className='meal_not_found'>No recipe available</span>
        </div>
      }
      {mealFound &&
        <div>
        </div>
      }


      
      
    </div>
  )
}

export default Top