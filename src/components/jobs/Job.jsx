import React, { PureComponent } from 'react'

export default class Job extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.fetchJob = this.fetchJob.bind(this);
    }

    render() {
        let { job } = this.state

        
        if (job) {
            return (
                <div className="job">
                    <h1>{job.name}</h1>
                    <span>{job.category.name} - {job.area.name}</span>
                    <p>{job.description}</p>

                    <div className="contact">
                        <h3>Kontakt</h3>
                        <p>{job.corp.name}</p>
                        <p>{job.corp.phone}</p>
                        <p>{job.corp.email}</p>
                    </div>
                </div>
            )
        }
        return(<h1>No such job found</h1>)

    }

    async componentDidMount() {
        this.fetchJob()
    }

    async fetchJob(){
        let { Api, match } = this.props;
        if(Api && match){
            let job = await Api.Jobs.getJobById(match.params.id)
            this.setState({
                job
            })
        }

    }

    async componentDidUpdate(prevProps){
        let { match } = this.props;
        if(prevProps.match.params !== match.params){
            this.fetchJob()
        }
    }
}
