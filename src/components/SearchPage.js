import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'
import Book from './Book'

export default class SearchPage extends React.Component {
  state = {
    searchBooks: []
  }
  onSearch = (e) => {
    if (e.target.value !== '') {
      BooksAPI.search(e.target.value).then((response)=> {
        if (response.error !== undefined) {
          this.setState({searchBooks: []})
        } else {
          this.setState({searchBooks: response})
        }
      }).catch(() => {
        this.setState({searchBooks: []})
      })
    } else {
      this.setState({searchBooks: []})
    }
  }
  render() {
    const { shelves, books, onAddBook } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.onSearch} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => {
              const bookIndex = books.map(book => book.id).indexOf(book.id)
              if (bookIndex !== -1) {
                book.shelf = books[bookIndex].shelf
              }
              return <Book key={book.id} shelves={shelves} book={book} onMoveBook={onAddBook} />
            })}
          </ol>
        </div>
      </div>
    )
  }
}