import React, { Component } from 'react';
import axios from 'axios';
export default class AddBook extends Component {
    constructor(){
        super();
        this.state = {
            isbn:null,
            title:null,
            subject:null,
            author:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value});
    }
    handleSubmit(e) {
        e.preventDefault();
        let newBook = {
            ISBN:this.state.isbn,
            TITLE:this.state.title,
            SUBJECT:this.state.subject,
            AUTHOR:this.state.author
        };
        axios.post('http://localhost:3333/API/book', newBook ).then((res)=>{
            this.setState({
                isbn: this.state.isbn,
                title: this.state.title,
                subject: this.state.subject,
                author: this.state.author,
                response: res.data
            })
        }).catch((err) => {
            this.setState({
                error: err
            })
        })
    }
    render() {
        return (
        
            <form method="post" onSubmit={this.handleSubmit}>
                {this.state && this.state.error ? `An Error occured :  ${this.state.error}` : ''}
                <label>ISBN</label>
                <input type="text" name="isbn" onChange={this.handleChange}/>
                <label>TITLE</label>
                <input type="text" name="title" onChange={this.handleChange}/>
                <label>SUBJECT</label>
                <input type="text" name="subject" onChange={this.handleChange}/>
                <label>AUTHOR</label>
                <input type="text" name="author" onChange={this.handleChange}/>
                <button type="submit">Submit</button>
                {this.state && this.state.response ? `Response :  ${this.state.response} ${console.log(this.state.response)}` : ''}
            </form>
        );
    }
}