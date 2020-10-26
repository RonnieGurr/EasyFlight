import React from 'react';
import { Jumbotron, Form, FormControl, Button, FormLabel} from 'react-bootstrap';
import { withRouter }  from 'react-router-dom';

let Airports = require('../data/airpost.json');


class Banner extends React.Component {
  constructor() {
    super()

    this.state = {
      returnFlight: false,
    }

    this.handleInput = this.handleInput.bind(this)
    this.search = this.search.bind(this)
    this.disableReturn = this.disableReturn.bind(this)
  }

  componentDidMount() {
    this.autoComplete(document.getElementById('fromInput'), Airports)
    this.autoComplete(document.getElementById('toInput'), Airports)
  }

  disableReturn(e) {
    const returnDate = document.getElementById('returnFlight')
    e.target.id === 'return' ? returnDate.disabled = true : returnDate.disabled = false
    if (returnDate.disabled) {
      this.setState({
        returnFlight: false
      })
    } else {
      this.setState({
        returnFlight: returnDate.value
      })
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  autoComplete(inp, arr) {
    var self = this;
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].city.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].city.substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].city.substr(val.length) + ' | ' + '<small><b>' + arr[i].airportName + '</b> | ' + arr[i].country + ' | ' + arr[i].IATA + '</small>';
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].airportName + ' | ' + arr[i].IATA + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value
                self.setState({
                  [inp.id]: inp.value
                })
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode === 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode === 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  search(e) {
    //Add validation
    e.preventDefault()

    let returnDate
    if (this.state.returnFlight) {
      returnDate = '&toDate=' + this.state.returnFlight
    } else {
      returnDate = ''
    }

    this.props.history.push({
      pathname: '/search',
      search: `?from=${this.state.fromInput}&to=${this.state.toInput}&fromDate=${this.state.fromDate}${returnDate}`
    })
    this.setState({
      search: true
    })
  }

  render() {
    return (
        <Jumbotron>
          <div className='container'>

          <h1>Let the good times roll</h1>
        
            <div className='jumbo-search'>
              <Form autoComplete='off' onSubmit={this.search}>
                <Form.Check onClick={this.disableReturn} inline label='Return' type='radio' name='returnDate' id='oneWay' defaultChecked />
                <Form.Check onClick={this.disableReturn} inline label='One way' type='radio' name='returnDate' id='return' />

                <div className='row no-gutters'>

                  <div className='col-md-3'>
                    <FormLabel>From</FormLabel>
                    <div className='autocomplete'>
                      <FormControl onChange={this.handleInput} type='text' id="fromInput" placeholder='Departure' required/>
                    </div>
                    <div id="autocomplete_result"></div>
                  </div>

                  <div className='col-md-3'>
                    <FormLabel>To</FormLabel>
                    <div className='autocomplete'>
                      <FormControl onChange={this.handleInput} type='text' id="toInput" placeholder='Destination' required/>
                    </div>
                    <div id="autocomplete_result"></div>
                  </div>

                  <div className='col-md-3'>
                    <FormLabel>Depart</FormLabel>
                    <FormControl onChange={this.handleInput} type='date' id='fromDate' required />
                  </div>

                  <div className='col-md-3'>
                    <FormLabel>Return</FormLabel>
                    <FormControl onChange={this.handleInput} type='date' id='returnFlight' required={!this.state.returnFlight}/>
                  </div>

                </div>

                <Button id='searchButton' type='submit' variant='outline-primary' className='button-1 mt-1'>Search Flights</Button>

              </Form>
            </div>

          </div>
        </Jumbotron>
      )
  }
}

export default withRouter(Banner);
