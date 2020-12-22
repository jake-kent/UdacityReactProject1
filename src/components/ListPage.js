import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

export default function ListPage({ shelves, books, onUpdateBook }) {
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
        <Link to='search'>Add a book</Link>
      </div>
    </div>
  )
}

ListPage.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateBook: PropTypes.func.isRequired,
}
