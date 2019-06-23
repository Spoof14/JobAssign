
class JobService{
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    _post(method, request, headers) {
		return fetch(`${this.baseUrl}/${method}`, {
			method: 'POST',
			body: JSON.stringify(request),
            headers: 
                headers 
                ?
                headers 
                :
                {
                    "content-type": "application/json",
			    }

		});
	}

	_get(method) {
		return fetch(`${this.baseUrl}/${method}`,
			{
				method: 'GET'
			}
		);
    }
    
    getCategories(){
        return this._get('categories')
            .then(res => {
            return res.json()
        })
    }

    getAreas(){
        return this._get('areas')
            .then(res => {
            return res.json()
        })
    }

    getJobsInCatInArea(category, area){
        return this._get(`jobs?category=${category}&area=${area}`)
        .then(res => {
            return res.json()
        })
    }

    getJobById(id){
        return this._get(`job?id=${id}`)
            .then(res => {
            return res.json()
        })
        
    }

    postJob(job, token){
        return this._post(`jobs`, {
            ...job
        }, {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + token
        }).then(res => {
            return res.json()
        })
    }
    
    
}

export default JobService;