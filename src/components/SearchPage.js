import React from 'react'
import PropTypes from 'prop-types'
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
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.onSearch} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => {
              const bookOnShelf = books.find(({ id }) => id === book.id)
              if (bookOnShelf) {
                book.shelf = bookOnShelf.shelf
              }
              return <Book key={book.id} shelves={shelves} book={book} onMoveBook={onAddBook} />
            })}
          </ol>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddBook: PropTypes.func.isRequired,
}
