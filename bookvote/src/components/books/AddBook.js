import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';

export default class AddBook extends Component {
    constructor(){
        super();
        this.state = {
            isbn: null,
            title: null,
            category: null,
            subcategory: null,
            subject: null,
            author: null,
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
        e.persist();
        let category;
        let subcategory;
        let subject;
        if(this.state.category) {
            if(this.state.category.indexOf(',') === -1) {
                category = [this.state.category];
            } else {
                category = this.state.category.split(', ');
            }
        }
        if(this.state.subcategory) {
            if(this.state.subcategory.indexOf(',') === -1) {
                subcategory = [this.state.subcategory];
            } else {
                subcategory = this.state.subcategory.split(', ');
            }
        }
        if(this.state.subject) {
            if(this.state.subject.indexOf(',') === -1) {
                subject = [this.state.subject];
            } else {
                subject = this.state.subject.split(', ');
            }
        }
        if(!this.state.category || !this.state.subcategory || !this.state.subject) {
            this.setState({error:"One or more required fields are missing."});
        } else {
            let newBook = {
                ISBN:this.state.isbn,
                TITLE:this.state.title,
                CATEGORY:category,
                SUBCATEGORY:subcategory,
                SUBJECT:subject,
                AUTHOR:this.state.author
            };
            axios.post(`${url}/API/book`, newBook ).then((res) => {                
                this.setState({
                    isbn: null,
                    title: null,
                    category: null,
                    subcategory: null,
                    subject: null,
                    author: null,
                    error:null,
                    response: res.data
                });
                e.target.reset();
            }).catch((err) => {
                this.setState({
                    error: err
                })
            })
        }
    }
    render() {
        return (
        
            <form method="post" onSubmit={this.handleSubmit}>
                {this.state && this.state.error ? `An Error occured :  ${this.state.error}` : ''}
                <label>ISBN</label>
                <input type="text" name="isbn" onChange={this.handleChange}/><br/>
                <label>TITLE</label>
                <input type="text" name="title" onChange={this.handleChange}/><br/>
                <label>CATEGORY</label>
                <input type="text" name="category" onChange={this.handleChange}/><br/>
                <label>SUBCATEGORY</label>
                <input type="text" name="subcategory" onChange={this.handleChange}/><br/>
                <label>SUBJECT</label>
                <input type="text" name="subject" onChange={this.handleChange}/><br/>
                <label>AUTHOR</label>
                <input type="text" name="author" onChange={this.handleChange}/><br/>
                <button type="submit">Submit</button>
                {this.state && this.state.response ? `Response :  ${this.state.response.RESPONSE[0]} ${this.state.response.RESPONSE[1]}` : ''}
            </form>
        );
    }
}
