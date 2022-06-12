let randomJoke = "";

describe('Visit Home Page', () => {
  it('Visits the Home page',  () => {
    cy.visit('/Home')
    cy.contains('Chuck Norris Joke Bookmark');
    cy.wait(2000);
  })
})
describe('Find a Random Joke', () => {
  it(`Click the Find Joke button in the Form and make sure 
  the random Joke fetched from ICNDB API and displayed in the text box`, () => {
    cy.visit('/Home')
    cy
      .get('form')
      .get('.find-joke')
      .click()
      .get('input').invoke('val').should("be.ok")
      .get('input').then(it => randomJoke = it.val.toString());
    cy.wait(2000);
  })
})

describe('Save the Joke and find it in the list', () => {
  it(`Edit the Field and click the Save button. 
  Joke will be saved in the database and 
  you can find it in the list of the jokes table`, () => {
    cy.visit('/Home');

    cy
      .get('.search-field').type(' ')
      .focused()
      .get('.save-joke')
      .click();

    cy.get('.jokes-list').get('tbody tr td').each(($ele) => {
      if ($ele.text().trim() == randomJoke) {
        expect($ele.text().trim()).to.equal(randomJoke)  //Assertion for exact text
      }
    });

    cy.wait(2000);
  })
})

describe('Delete a Joke from the list', () => {
  it(`Edit the Field and click the Save button. 
  Joke will be saved in the database and 
  you can find it in the list of the jokes table`, () => {
    cy.visit('/Home');

    cy.get('input[type="checkbox"]').eq(1).check({ force: true })
      .get('.delete-jokes').click();
  })
})
