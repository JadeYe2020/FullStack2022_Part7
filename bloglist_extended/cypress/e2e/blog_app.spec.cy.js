describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('new post').click()
      cy.get('#title-input').type('a new blog title')
      cy.get('#author-input').type('some author')
      cy.get('#url-input').type('http://someurl.com')
      cy.get('#submit-button').click()

      cy.get('.blogItem').contains('a new blog title some author')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createNew({
          title: '1st blog title',
          author: '1st author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: '2nd blog title',
          author: '2nd author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: '3rd blog title',
          author: '3rd author',
          url: 'http://someurl.com'
        })
      })

      it('users can like a blog', function () {
        cy.get('.blogItem').contains('2nd blog title').contains('view').click()
          .get('#like').click()

        cy.get('.blogItem').contains('2nd blog title').get('#likes').contains('1')
      })

      it('the user who created a blog can delete it', function () {
        cy.get('.blogItem').contains('3rd blog title').contains('view').click()
          .get('#delete-button').click()

        cy.get('.blogItem').should('not.contain', '3rd blog title')
      })
    })

    describe('the blog with the most likes being first', function () {
      beforeEach(function () {
        cy.createNew({
          title: 'The title with the least likes',
          author: '1st author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: 'The title with the most likes',
          author: '2nd author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: 'The title with the second most likes',
          author: '3rd author',
          url: 'http://someurl.com'
        })
      })

      it('make different numbers of likes for the blogs', function () {
        for (let i = 0; i < 3; i ++) {
          cy.contains('view').click()
        }
        // like 2 times for 'The title with the least likes'
        for (let i = 0; i < 2; i ++) {
          cy.get('.blogItem').contains('The title with the least likes').find('#like').click().parent().contains((i + 1).toString())
        }
        // like 5 times for 'The title with the most likes'
        for (let i = 0; i < 5; i ++) {
          cy.get('.blogItem').contains('The title with the most likes').find('#like').click().parent().contains((i + 1).toString())
        }
        // like 3 times for 'The title with the second most likes'
        for (let i = 0; i < 3; i ++) {
          cy.get('.blogItem').contains('The title with the second most likes').find('#like').click().parent().contains((i + 1).toString())
        }
        // the order should be '2nd blog title', '3rd blog title' and '1st blog title'
        cy.get('.blogItem').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blogItem').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blogItem').eq(2).should('contain', 'The title with the least likes')
      })
    })
  })
})