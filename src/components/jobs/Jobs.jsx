import React, { PureComponent } from 'react'
import List from '../../utility/List';
import LinkListItem from '../../utility/LinkListItem';

export default class Jobs extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             jobs:[]
        }
    }
    
    render() {
        let { jobs } = this.state;
        if(jobs.length > 0){
            return (
                <div>
                    <List items={jobs} Component={LinkListItem} listName="list" className="list-item" location={this.props.location} link='/job/' useId={true}></List>
                </div>
            )
        }
        return <div>Der er desværre ingen jobs som matcher din beskrivelse </div> 
    }

    async componentDidMount(){
        let { Api, match} = this.props;
        let { category, area } = match.params;
        let jobs = await Api.Jobs.getJobsInCatInArea(category, area);

        this.setState({
            jobs
        })
    }
}
