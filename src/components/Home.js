import React from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import images from '../images/index';
import explorer from '../images/explorer.png';
import explorer2 from '../images/explorer-2.png';
import explorer3 from '../images/explorer-3.png';

function getPlaces() {

  const places = [{id: 1, fullLocation: 'Glasgow International Airport | GLA', location: 'Glasgow', country: 'United Kingdom', img: images.glasgow},
                  {id: 2, fullLocation: 'John F Kennedy International Airport | JFK', location: 'New York', country: 'United States', img: images.newYork}, 
                  {id: 3, fullLocation: 'Lester B. Pearson International Airport | YYZ', location: 'Toronto', country: 'Canada', img: images.toronto}, 
                  {id: 3, fullLocation: 'Miami International Airport | MIA', location: 'Miami', country: 'United States', img: images.miami}, 
                  {id: 4, fullLocation: 'Charles de Gaulle International Airport | CDG', location: 'Paris', country: 'France', img: images.paris}, 
                  {id: 5, fullLocation: 'Milano Linate Airport | LIN', location: 'Milan', country: 'Italy', img: images.milan}, 
                  {id: 6, fullLocation: 'Barcelona International Airport | BCN', location: 'Barcelona', country: 'Spain', img: images.barcelona}]

  const selectedPlaces = []
  for (let i = 0; i < 3; i++) {
    let num;
    let selected = () => { num = Math.floor(Math.random() * places.length) }
    do {
      selected()
    } while (selectedPlaces.includes(places[num]))
    selectedPlaces.push(places[num])
  }
  return selectedPlaces
}

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      places: getPlaces(),
    }

    this.search = this.search.bind(this)
  }

  componentDidMount() {

    gsap.registerPlugin(ScrollTrigger)

    gsap.from('#rec-1', {
      scrollTrigger: {
        start: 'top',
        trigger: '.navbar'
      },
      y: 100,
      opacity: 0,
      duration: 1
    })

    gsap.from('#rec-2', {
      scrollTrigger: {
        start: 'top',
        trigger: '.navbar'
      },
      y: 200,
      opacity: 0,
      duration: 1
    })

    gsap.from('#rec-3', {
      scrollTrigger: {
        start: 'top',
        trigger: '.navbar'
      },
      y: 300,
      opacity: 0,
      duration: 1
    })

    gsap.from('#exp-1', {
      scrollTrigger: {
        start: 'top',
        trigger: '.section-1 .row'
      },
      x: 500,
      opacity: 0,
      duration: 1
    })

    gsap.from('#exp-2', {
      scrollTrigger: {
        start: 'top',
        trigger: '.section-1 .row'
      },
      x: 700,
      opacity: 0,
      duration: 1.5
    })
    
    gsap.from('#exp-3', {
      scrollTrigger: {
        start: 'top',
        trigger: '.section-1 .row'
      },
      x: 900,
      opacity: 0,
      duration: 2
    })

  }

  search(e) {

    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 7)
    var day = currentDate.getDate()
    if (day < 10) day = `0${day}`
    var month = currentDate.getMonth() + 1
    month > 9 ? month = month: month = `0${month}`
    var year = currentDate.getFullYear()
    
    var fromDate = `${year}-${month}-${day}`

    var returnDate = currentDate.setDate(currentDate.getDate() + 7)
    returnDate = new Date(returnDate)
    var returnDay = returnDate.getDate()
    if (returnDay < 10) returnDay = `0${returnDay}`
    var returnMonth = returnDate.getMonth() + 1
    var returnYear = returnDate.getFullYear()

    this.props.history.push({
      pathname: '/search',
      search: `?from=London Gatwick Airport | LGW&to=${e}&fromDate=${fromDate}&toDate=${returnYear}-${returnMonth}-${returnDay}`
    })
    this.setState({
      search: true
    })
  }

  render() {
    var self = this;
    if (!this.state.places) {
      return (
        <h2>Loading</h2>
      )
    } else {
      return (
          <div>
              <div className='section-1'>
                  <div className='container'>

                    <h2>Our Recommendations</h2>
                    <div className='row'>

                      {this.state.places &&
                        this.state.places.map(function (place, index) { 
                          return (
                            <div onClick={(function() {self.search(place.fullLocation)})} key={index} className={index === 1 ? 'col' : 'col-md-3'} id={`rec-${index + 1}`}>
                            <div className='container' style={{backgroundImage: `url(${place.img})`}}>
                              <div className='card-info'>
                                <h4>{place.location}, <span>{place.country}</span></h4>
                                <p>Get flight prices</p>
                              </div>
                            </div>
                          </div>
                          )
                        })
                      }

                    </div>

                  </div>  
              </div>

              <div className='section-2'>
                
                <h2>Why Book With Us</h2>
                
                <div className='container-fluid'>

                    <div className='container'>
                      <div className='row'>
                        <div className='col-md-4' id='exp-1'>
                          <img src={explorer} height='300px' alt='explorer'/>
                          <h5>Go everywhere</h5>
                        </div>
                        <div className='col-md-4' id='exp-2'>
                          <img src={explorer2} height='300px' alt='explorer2'/>
                          <h5>Keep it easy</h5>
                        </div>
                        <div className='col-md-4' id='exp-3'>
                          <img src={explorer3} height='300px' alt='explorer3'/>
                          <h5>Relax and enjoy</h5>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            
            </div>
      )
    }
  }
}

export default Home;
