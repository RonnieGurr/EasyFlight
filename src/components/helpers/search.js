import axios from 'axios'

const search = {
    getData: (Search) => new Promise(function (resolve, reject) {
        //Get and return data
        if (!Search.from && !Search.to && !Search.fromDate) reject({error: 'Input error'})

        let searchString = `${Search.from}/${Search.to}/${Search.fromDate}`
        if (Search.toDate.length > 0) searchString += `/${Search.toDate}`

        axios({
            'method':'GET',
            'url':`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-US/${searchString}`,
            'headers': {
                'content-type':'application/octet-stream',
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "",
                "useQueryString": true
            }
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default search