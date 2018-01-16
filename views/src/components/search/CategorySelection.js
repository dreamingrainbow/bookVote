import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate, setCategory, setSubcategory } from '../../actions';
import { Categories } from './Categories';

class CategorySelection extends Component {
    constructor(props) {
        super(props)        
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        this.setState({            
            category:this.props.category
        })
    }

    handleClick(e) {
        //e.preventDefault();
        this.props.setCategory(e.target.innerText);
        this.props.setSubcategory();
        this.setState({category:e.target.innerText, subcategory:null});
    }

    render(){
        return(            
            <nav>
            {                
                Categories.map((category) => <NavLink to={category.path} className="button" activeClassName="button--active" key={category.name} onClick={this.handleClick}>{category.name}</NavLink>)
            }   
            </nav>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        user : state.user, 
        category: state.category,
        subcategory: state.subcategory
    };
  }

export function mapDispatchToProps(dispatch) {
    return bindActionCreators({authenticate, setCategory, setSubcategory}, dispatch);
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategorySelection));