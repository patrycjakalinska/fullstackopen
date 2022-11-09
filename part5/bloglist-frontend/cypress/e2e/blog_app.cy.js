describe('Blog app', () => {
  beforeEach(function () {
    const user = {
      username: 'test',
      name: 'Testing Johnny',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/testing/reset').then(() => {
      cy.createUser(user)
      cy.visit('http://localhost:3000')
    })
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('.login-form').contains('login')
  })

  describe('login', () => {
    it('user can log in successfully with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Testing Johnny logged in')
    })

    it('user cannot log in with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login('test', 'password')
    })

    it('A blog can be created', function () {
      cy.contains('new blog post').click()
      cy.get('#title').type('My best band in the world')
      cy.get('#author').type('Chopin')
      cy.get('#url').type('http://finesia.yu/23-tt')
      cy.get('.blog-form--button').click()

      cy.get('.blogs')
        .contains('My best band in the world')
        .parent()
        .as('newBlog')
      cy.get('@newBlog').contains('Chopin')
    })

    describe('when there is a blog', () => {
      beforeEach(function () {
        cy.createBlog({
          title: 'sometitle',
          author: 'someauthor',
          url: 'someurl',
        })
      })

      it('like function works properly', function () {
        cy.get('.blogs').contains('sometitle').parent().as('currentBlog')
        cy.get('@currentBlog').contains('view').click()
        cy.get('@currentBlog').contains('likes: 0')
        cy.get('@currentBlog').contains('like').click()
        cy.get('@currentBlog').contains('likes: 1')
      })

      it('only author (user) can delete blog', function () {
        cy.get('.blogs').contains('sometitle').parent().as('currentBlog')
        cy.get('@currentBlog').contains('view').click()
        cy.get('@currentBlog').contains('remove').click()
        cy.get('.blogs').should('not.contain', 'sometitle')
      })
    })

    describe('when there are multiple blogs', () => {
      beforeEach(function () {
        cy.createBlog({
          title: 'sometitle1',
          author: 'someauthor1',
          url: 'someurl1',
          likes: 4
        })
        cy.createBlog({
          title: 'sometitle2',
          author: 'someauthor2',
          url: 'someurl2',
          likes: 2
        })
        cy.createBlog({
          title: 'sometitle3',
          author: 'someauthor3',
          url: 'someurl3',
          likes: 10
        })
      })

      it.only('blogs are ordered by number of likes descending', function () {
        const likes = []

        cy.get('.blog-post').each((blog) => {
          cy.wrap(blog)
            .contains('view')
            .click()
            .then(() => {
              cy.wrap(blog)
                .get('.likes-count')
                .then((num) => {
                  likes.push(Number(num))
                  let sortedDesc = true

                  for (let i = 0; i < likes.length - 1; i++) {
                    if (likes[i] < likes[i + 1]) {
                      sortedDesc = false
                      break
                    }
                  }

                  expect(sortedDesc).equal(true)
                })
            })
        })
      })
    })
  })
})
