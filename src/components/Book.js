import React from 'react'
import PropTypes from 'prop-types'

export default class Book extends React.Component {
  render() {
    const { shelves, book } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.props.onMoveBook(book, e.target.value)} value={book.shelf ? book.shelf : 'none'}>
                <option value="move" disabled>Move to...</option>
                {shelves.map((shelf) => (
                  <option key={shelf.slug} value={shelf.slug}>{shelf.title}</option>
                ))}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  book: PropTypes.object.isRequired,
}
