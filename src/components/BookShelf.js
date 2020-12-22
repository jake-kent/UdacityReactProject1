import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

export default function BookShelf({ shelves, shelf, books, onUpdateBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} shelves={shelves} book={book} onMoveBook={onUpdateBook}  />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  shelf: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
}
