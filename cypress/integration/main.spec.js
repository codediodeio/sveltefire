/// <reference types="cypress" />

describe('SvelteFire app', function() {
  this.beforeAll(() => {
    // cy.clearCookies()
    // cy.clearLocalStorage()
    cy.visit('http://localhost:5000')
    cy.contains('Sign Out').click();
  })

  it('shows the default UI', function() {

    cy.contains('Firebase Ready [DEFAULT]');
    cy.contains('UID').should('not.exist');
  })

  it('it logs a user in', function() {
    cy.contains('Sign In').click();
    cy.contains('UID').should('exist');
    cy.contains('Sign Out').should('exist');
    cy.wait(15000); // Emulator takes long time to respond here...
  })

  it('fetches a document from Firestore', function() {

    cy.contains('Create Post').click();
    cy.contains('My Post').should('exist');
    cy.contains('Create Post').should('not.exist');
  })

  it('displays the fallback slot on error', function() {
    cy.contains('Secure Post').should('not.exist');
    // Cypress does not propagate error...
    cy.contains('Unable to read secure doc').should('exist');
  })

  it('queries a collection from Firestore', function() {
    cy.contains('Add Comment').click();
    cy.contains('My Awesome Comment').should('exist');
    cy.contains('Add Comment').click();
    cy.get('#posts').children().should('be.have.length', 2);
  })

  it('deletes queried references from Firestore', function() {
    cy.contains('Delete').last().click();
    cy.get('#posts').children().should('be.have.length', 1);
  })

  it('listens to events from a parent component', function() {
    cy.contains('Path: posts/event-post').should('exist')
    cy.contains('Event Data').should('exist');
    cy.contains('Update Event').click();
    cy.contains('My Data Changed').should('exist');
  })
})