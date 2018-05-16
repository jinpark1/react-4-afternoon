import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ClassList extends Component {
  constructor() {
    super()

    this.state = {
      students: [],
    };
    
  }

  componentDidMount() {
    axios.get(`http://localhost:3005/students?class=${ this.props.match.params.class }`).then( results => {
      this.setState({
        students: results.data
      },()=>{console.log('----------componentDidMount', this.state.students)}); //console log here to see the data from the request.
    });
  }

  render() {
    console.log('----------renderprops', this.props)
    const students = this.state.students.map((students, i) => {
      return (
        <Link to={`/student/${students.id}`} key={ i }>
          <h3>{ students.first_name } { students.last_name }</h3>
        </Link>
      )
    })

    return (
      <div className="box">
        <Link to='/'><button>Back to Home</button></Link>
        <h1>{ this.props.match.params.class }</h1>
        <h2>ClassList:</h2>
        { students }
      </div>
      
    )
  }
}