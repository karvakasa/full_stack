describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function() {
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('varas')
      cy.get('input:last').type('xtraCrispy')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe.only('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('A blog can be created', function() {
      // ...
      cy.get('#newblog-button').click()
      cy.get('input:first').type('uusi kirjoittaja')
      cy.get('input:eq(1)').type('uusi otsikko')
      cy.get('input:eq(2)').type('uusi url')
      cy.get('#save-button').click()
      cy.contains('uusi otsikko')
    })
    it('A blog can be liked', function() {

      cy.get('#newblog-button').click()
      cy.get('input:first').type('uusi kirjoittaja')
      cy.get('input:eq(1)').type('uusi otsikko')
      cy.get('input:eq(2)').type('uusi url')
      cy.get('#save-button').click()

      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })
    it('A blog can be removed', function() {

      cy.get('#newblog-button').click()
      cy.get('input:first').type('uusi kirjoittaja')
      cy.get('input:eq(1)').type('uusi otsikko')
      cy.get('input:eq(2)').type('uusi url')
      cy.get('#save-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
    })
  })
})