import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import SearchPage from './components/SearchPage'
import ListPage from './components/ListPage'
import './App.css'

class Shelf {
  constructor(title, slug) {
    this.title = title
    this.slug = slug
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searchBooks: [],
    books: [],
    shelves: [
      new Shelf('Currently Reading', 'currentlyReading'),
      new Shelf('Want To Read', 'wantToRead'),
      new Shelf('Read', 'read')
    ]
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({books})
  }

  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      const newBooks = this.state.books
      var bookIndex = newBooks.map(book => book.id).indexOf(book.id)
      newBooks[bookIndex].shelf = shelf
      this.setState({books: newBooks})
    })
  }

  onAddBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      const newBooks = this.state.books
      var bookIndex = newBooks.map(book => book.id).indexOf(book.id)
      if (bookIndex !== -1) {
        newBooks[bookIndex].shelf = shelf
        this.setState({books: newBooks})
      } else {
        const newBook = book
        newBook.shelf = shelf
        this.setState((prevState) => ({books: prevState.books.concat([newBook])}))
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/'>
          <ListPage books={this.state.books} shelves={this.state.shelves} onUpdateBook={this.onUpdateBook} />
        </Route>
        <Route path='/search'>
          <SearchPage books={this.state.books} shelves={this.state.shelves} onAddBook={this.onAddBook} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
