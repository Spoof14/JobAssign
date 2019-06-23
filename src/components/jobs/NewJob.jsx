import React, { PureComponent } from 'react'
import Input from '../../utility/Input';


export default class NewJob extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            selectedArea: '',
            selectedCategory: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let { name, description, selectedArea, selectedCategory } = this.state
        this.props.createNewJob({name, description, area:selectedArea, category:selectedCategory})
    }

    render() {
        let { title, description, selectedArea, selectedCategory } = this.state;
        let areas = this.props.areas.map(area => <option key={area._id} value={area._id}>{area.name}</option>)
        let categories = this.props.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
        let defaultOption = <option value='' disabled hidden></option>

        return (
            <form className="login-container">
                <Input onChange={this.onChange} label='Title' name='name' value={title}></Input>
                <Input onChange={this.onChange} label='Description' name='description' value={description}></Input>

                <div className="login-input">
                    <label>
                        Areas:
                        <select value={selectedArea} onChange={this.onChange} name='selectedArea'>
                            {defaultOption}
                            {areas}
                        </select>
                    </label>
                </div>


                <div className="login-input">
                    <label>
                        Categories:
                    <select value={selectedCategory} onChange={this.onChange} name='selectedCategory'>
                            {defaultOption}
                            {categories}
                        </select>
                    </label>
                </div>



                <input type="submit" onClick={this.onSubmit} value="Submit"></input>
            </form>
        )
    }
}
