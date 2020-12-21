import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

export default class ListPage extends React.Component {
  render() {
    const { shelves, books, onUpdateBook } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <BookShelf key={shelf.slug} shelves={shelves} shelf={shelf} books={books.filter((book) => book.shelf === shelf.slug)} onUpdateBook={onUpdateBook} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}