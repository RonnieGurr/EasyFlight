import { param } from 'jquery';
import React from 'react';
import search from './helpers/search'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            results: {}
        }
    }

    componentDidMount() {

        this.setState({
            url: window.location.href
        })

        let params = (new URL(document.location)).searchParams;
        try {
            const searchData = {
                from: params.get('from').split('|')[1].trim(''),
                to: params.get('to').split('|')[1].trim(),
                fromDate: params.get('fromDate'),
                toDate: params.get('toDate') ? params.get('toDate') : ''
            }
            search.getData(searchData).then(response => {
                this.setState({
                    results: response,
                    loading: false
                })
            }).catch(err => {
                this.setState({
                    loading: false,
                    error: true,
                    results: 0
                })
            })
        } catch (error) {
            this.setState({
                loading: false,
                error: true,
                results: 0
            })
        }

    }

    componentDidUpdate() {
        if (window.location.href !== this.state.url) {
            let params = (new URL(document.location)).searchParams;
            try {
                const searchData = {
                    from: params.get('from').split('|')[1].trim(''),
                    to: params.get('to').split('|')[1].trim(),
                    fromDate: params.get('fromDate'),
                    toDate: params.get('toDate') ? params.get('toDate') : ''
                }
                search.getData(searchData).then(response => { 
                    this.setState({
                        results: response,
                        url: window.location.href,
                        loading: false
                    })
                }).catch(err => {
                    this.setState({
                        loading: false,
                        error: true,
                        results: 0
                    })
                })
            } catch (error) {
                this.setState({
                    loading: false,
                    error: true,
                    results: 0
                })
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <h1>Loading</h1>
            )
        }
        else if (this.state.error) {
            return (
                <h1>Search Error</h1>
            )
        }
        else {
            return (
                <div className='search-results'>
                    <div className='container'>
                        
                        <h2>{this.state.results ? this.state.results.Carriers.length : '0'} Carriers Found</h2>

                        <div className='carriers'>
                            <div className='row' style={this.state.results.Carriers.length > 0 ? {display: 'flex'} : {display: 'none'}}>
                            {this.state.results && this.state.results.Carriers.map(x => {
                                if (this.state.results.Carriers.length !== 0) {
                                    return (
                                        <div key={x.CarrierId} className={this.state.results.Carriers.length > 3 ? 'col-md-3' : 'col'}>
                                            <h3 >{x.Name}</h3>
                                        </div>
                                    )
                                } return null
                            })}
                            </div>
                        </div>

                        <h2>{this.state.results ? this.state.results.Quotes.length : '0'} Quotes Found</h2>

                        <div className='quotes'>
                            <div className='row'>
                                {this.state.results && this.state.results.Quotes.map(x => {
                                    return (
                                        <div key={x.QuoteId} className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <h3>Outbound Leg</h3>
                                                    {this.state.results.Carriers.map(id => {
                                                        if (id.CarrierId === x.OutboundLeg.CarrierIds[0]) {
                                                            return ( <p key={id.CarrierId}>Carrier Name: {id.Name}</p> )
                                                        } return null
                                                    })}
                                                    <p>Carrier ID: {x.OutboundLeg.CarrierIds[0]}</p>
                                                    <p>Departure Date: {x.OutboundLeg.DepartureDate.split('T')[0]}</p>
                                                    <p>Destination ID: {x.OutboundLeg.DestinationId}</p>
                                                    {this.state.results.Places.map(location => {
                                                        if (x.OutboundLeg.DestinationId === location.PlaceId) {
                                                            return ( <p key={location.PlaceId}>Airport Name: {location.Name}</p> )
                                                        } return null
                                                    })}
                                                    <p>Origin ID: {x.OutboundLeg.OriginId}</p>
                                                </div>
                                                <div className='col-md-4'>
                                                <h3>Inbound Leg</h3>
                                                    {this.state.results.Carriers.map(id => {
                                                        if (x.InboundLeg && id.CarrierId === x.InboundLeg.CarrierIds[0]) {
                                                            return (
                                                            <>
                                                            <p key={id.CarrierId}>Carrier Name: {id.Name}</p> 
                                                            <p>Carrier ID: {x.InboundLeg.CarrierIds[0]}</p>
                                                            <p>Departure Date: {x.InboundLeg.DepartureDate.split('T')[0]}</p>
                                                            <p>Destination ID: {x.InboundLeg.DestinationId}</p>
                                                            </>
                                                            )
                                                        } return null
                                                    })}
                                                    {this.state.results.Places.map(location => {
                                                        if (x.InboundLeg && x.InboundLeg.DestinationId === location.PlaceId) {
                                                            return (
                                                            <>
                                                            <p key={location.PlaceId}>Airport Name: {location.Name}</p> 
                                                            <p>Origin ID: {x.InboundLeg.OriginId}</p>
                                                            </>
                                                            )
                                                        } return null
                                                    })}
                                                </div>
                                                <div className='col-md-4'>
                                                    <h3>Flight Information</h3>
                                                    <p>Direct: {x.Direct ? 'True' : 'False'}</p>
                                                    <p>Minimum Price: £{x.MinPrice}</p>
                                                    {this.state.results.Places.map(location => {
                                                        if (x.OutboundLeg.DestinationId === location.PlaceId) {
                                                            return ( <p key={location.PlaceId}>Destination Name: {location.CityName}, {location.CountryName}</p> )
                                                        } return null
                                                    })}
                                                    <p>Departure Date: {x.OutboundLeg.DepartureDate.split('T')[0]}</p>
                                                    <p>Return Date: {x.InboundLeg && x.InboundLeg.DepartureDate.split('T')[0]}</p>
                                                    <button type="button" className="button-1 mr-sm-1 btn btn-outline-primary">Save</button>
                                                </div>
                                            </div>
                                        </div>    
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default Search;