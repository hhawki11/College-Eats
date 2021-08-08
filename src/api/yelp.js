import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer jFoVN7LlylhHuIh6e98G930UXBpWsl20i8qQHM30bvB222C_L-5IsJYgOF2fzfufBimEJU8R8W04x9BOiR2HmOK-V2GVDMha-UVdQ4EGaoFsPtY23IZOYsjq1KLrYHYx'
    }
})