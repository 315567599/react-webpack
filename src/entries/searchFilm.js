/**
 * Created by Administrator on 2017/9/1.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

class SearchBar extends React.Component {
    constructor(props) {
       super(props);
       this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
       this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchInputChange(e) {
       this.props.onSearchTextChange(e.target.value);
    }

    handleSearchClick(e) {
       e.preventDefault();
       this.props.onSearchClick();
    }

    render() {
       return (
          <form>
              <input type="text" placeholder="search..." value={this.props.searchText} onChange={this.handleSearchInputChange}/>
              <input type="submit"  value="submit" onClick={this.handleSearchClick}/>
          </form>
       );
    }
}

function Cast(props) {
    if (!props.avatars) {
       return null;
    }
    return (
        <span>
           <img src={(props.avatars !==null && props.avatars.medium != null) ? props.avatars.medium : ' '} />
           <label>{props.name}</label>
            {' '}
        </span>
    );
}

function CastList(props) {
    console.log(props.casts);
    var casts = [];
    props.casts.forEach((cast, idx)=>{
       casts.push(<Cast {...cast} key={idx}/>);
    });

    return (
        <div>
            {casts}
        </div>
    );
}

class FilmRow extends React.Component {
    constructor(props) {
       super(props);
       this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    handleTitleClick(e) {
        e.preventDefault();
        let title = e.target.getAttribute('data-id');
        alert(`click ${title}`);
    }

    render () {
        var genres = this.props.genres.join(' ');

        return (
            <tr>
                <td><a data-id={this.props.id} onClick={this.handleTitleClick}>{this.props.title}</a></td>
                <td>{this.props.genres}</td>
                <td><img src= {this.props.images.large} /></td>
                <td><CastList casts={this.props.casts}/></td>
            </tr>
        );
    }
}


function FilmTable(props) {
    var rows = [];
    props.films.forEach((film) =>{
        rows.push(<FilmRow {...film}  key={film.id}/>)
    });

    return (
       <table>
           <thead>
               <tr>
                   <th>Title</th>
                   <th>Genres</th>
                   <th>Poster</th>
                   <th>Casts</th>
               </tr>
           </thead>
           <tbody>{rows}</tbody>
       </table>
    );
}

class SearchFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            films:[]
        };
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.fetchFilms = this.fetchFilms.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);

    }

    componentDidMount() {
        //let url =`http://localhost:8080/douban/v2/movie/search?q=${encodeURI(this.state.searchText)}`;
        //this.fetchFilms(url);
    }

    handleSearchTextInput(searchText) {
        this.setState({
            searchText:searchText
        });
    }

    handleSearchClick() {
        let url =`http://localhost:8080/douban/v2/movie/search?q=${encodeURI(this.state.searchText)}`;
        this.fetchFilms(url);
    }

    fetchFilms(url) {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result.subjects);
                this.setState({
                    films:result.subjects
                });
            });
    }

    render() {
       return (
           <div>
               <SearchBar
                  searchText = {this.state.searchText}
                  onSearchTextChange = {this.handleSearchTextInput}
                  onSearchClick = {this.handleSearchClick}
               />
               <FilmTable films={this.state.films} />
           </div>
       );
    }
}

ReactDOM.render(
    <SearchFilm />,
    document.getElementById('root')
);
