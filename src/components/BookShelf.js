import React from 'react'

import Book from './Book'

export default class BookShelf extends React.Component {
  render() {
    const { shelves, shelf, books, onUpdateBook } = this.props
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
}
