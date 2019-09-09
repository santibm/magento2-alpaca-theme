describe('Bundle product', function () {
  it('Visits product', () => {
    cy.visit('/sprite-yoga-companion-kit')
    cy.get('.breadcrumbs__list').should('be.visible')
  })

  it('Check visiblility of content', () => {
    cy.get('.product-view__main-details').should('be.visible')
    cy.get('[data-ui-id=page-title-wrapper]').should('be.visible')
    cy.get('.product-view__information').should('be.visible')
    cy.get('.product-view__sku').should('be.visible')
    cy.get('.price-box').should('be.visible')
    cy.get('#product-options-wrapper').should('be.visible')
    cy.get('.bundle-option').should('be.visible')
    cy.get('.quantity-update').should('be.visible')
    cy.get('#product-addtocart-button').should('be.visible')
    cy.get('[data-testid=product-tab__title]').contains('Details').should('be.visible')
    cy.get('[data-testid=product-tab__title]').contains('Reviews').should('be.visible')
  })

  it('Test product options', () => {
    cy.get('#product-options-wrapper').should('be.visible')
      .then((elements) => {
        cy.log(elements.length)
      })
    cy.get('.radio__fieldset').find('.radio__label')
      .click({
        multiple: true
      })
      .then((elements) => {
        cy.log(elements.length)
      })
    cy.get('#product-addtocart-button').first().click()
    cy.server()
    cy.route('/customer/section/load/?sections=cart*').as('addToCart')
    cy.wait('@addToCart')
  })

  it('Check if mini-cart is not empty', () => {
    cy.get('[data-testid=minicart-link]').click()
    cy.get('#minicart-content-wrapper').should('be.visible')
    cy.contains('You have no items in your shopping cart.').should('not.be.visible')
  })
})
