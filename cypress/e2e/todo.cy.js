describe('todo-list', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/todo-list/index.html')
  })

  //When adding a blank task, an error message should return "Task cannot be blank"
  it ('error message received with blank entry', () => {
    cy.get('#addNew').should('be.visible')
    cy.get('.modal-body').should('not.be.visible')
    cy.get('#addNew').click()
    cy.get('.modal-body').should('be.visible')
    cy.get('#textInput').should('be.visible')
    cy.get('#add').should('be.visible').click()
    cy.get('#msg').should('have.text', 'Task cannot be blank')
    cy.get('.modal-body').should('be.visible').wait(1000)
  });

  //adding a new task to make sure it functions as expected and appears in the tasks section.
  it ('Adding new task', () => {
    cy.get('#addNew').click()
    cy.get('#textInput').click().type('adding a new task.')
    cy.get('#dateInput').should('be.visible').click()
    
    //this is utilizing the custom command to input the current date.
    cy.get('#dateInput').click()
    cy.currentDate().then((formattedDate) => {
      cy.get('#dateInput').click().type(formattedDate)
    })

    cy.get('#textarea').should('be.visible').click()
    cy.get('#textarea').type('this test is going rather well')
    cy.get('#add').click()
    cy.get('#0').should('be.visible').invoke('text').then((text) => {
      //involing the function and replacing all /n with spaces and making sure the task contains the proper description.
      const cleanText = text.replace(/\n/g, '').trim()
      expect(cleanText).to.contain('this test is going rather well')
    })
    //checking the localstorage and making sure that the data/value is definitley true
    cy.window().then(() => {
      const storedData = !!
      window.localStorage.getItem('data')
      expect(storedData).to.be.true

  })
})

it('checking the delete button functionality', () => {
  cy.get('#tasks > :nth-child(1)').should('be.visible')
  cy.get(':nth-child(1) > .options > [onclick="deleteTask(this)"]').should('be.visible').click()
})

it('checking the edit button functionality', () => {
  cy.get(':nth-child(1) > .options > [onclick="updateTask(this)"]').should('be.visible').click()
  cy.get('#textInput').click().clear()
  //using force: true because Cypress was not typing the out the full sentence 'this task has changed'
  cy.get('#textInput').type('this task has changed', { force: true })
  cy.get('#add').click()
  cy.get('#0').should('be.visible')
})

it('deleting a task removes from local storage', () => {
  cy.get('#addNew').click()
    cy.get('#textInput').click().type('This gets removed.')
    cy.currentDate().then((formattedDate) => {
      cy.get('#dateInput').click().type(formattedDate)
    })
    cy.get('#textarea').should('be.visible').click()
    cy.get('#textarea').type('this test is going rather well')
    cy.get('#add').click()

    //checking to make sure the data is saved
    
    cy.window().then(() => {
      const storedData = !!
      window.localStorage.getItem('data')
      expect(storedData).to.be.true
    })
    cy.get('#0  > .options > [onclick="deleteTask(this)"]').click()

    //and then checking that the data was deleted from the local storage.
    cy.window().then(() => {
      const storedData = window.localStorage.getItem('data')
      expect(storedData).to.eql('[]')
    })


    
})


})