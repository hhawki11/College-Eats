import { useEffect, useState } from "react"
import yelp from "../api/yelp"

export default (lim, search, loc) => {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const searchApi = async (limit, searchTerm, location) => {
        try {
             const response = await yelp.get('/search', {
                params: {
                    limit: limit,
                    term: searchTerm,
                    location: location
                }
            })
            setErrorMessage(null)
            setResults(response.data.businesses)
        } catch (err) {
            setErrorMessage('Something went wrong')
        }
    }

    
    useEffect(() => {
        searchApi(lim, search, loc)
    })

    return [searchApi, results, errorMessage]
}