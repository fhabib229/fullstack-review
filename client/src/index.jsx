import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: data => {
        this.setState({repos: data});
        console.log('Successfully retrieved!');
      },
      error: () => console.log('Error in getting repos in index.jsx')
    });
  }

  search (term) {
    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'text/plain',
      data: term,
      success: () => {
        this.componentDidMount()
        console.log('Successfully Posted');
      },
      error: () => console.log('Error in posting repos in index.jsx')
    });
  }



  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));