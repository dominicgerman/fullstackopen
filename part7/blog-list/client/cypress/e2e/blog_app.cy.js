describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Dom German",
      username: "germandom",
      password: "thelifeaquatic",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("germandom");
      cy.get("#password").type("thelifeaquatic");
      cy.get("#login-button").click();

      cy.contains("Dom German logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("germandom");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Dom German logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "germandom", password: "thelifeaquatic" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get(".titleInput").type("a blog created by cypress");
      cy.get(".authorInput").type("mr. cypress");
      cy.get(".urlInput").type("cypress.com");
      cy.get(".submitButton").click();
      cy.contains("a blog created by cypress");
    });

    describe("and some blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "mr. cute",
          url: "someurl.com",
        });
        cy.createBlog({
          title: "second blog",
          author: "mr. cute",
          url: "someurl.com",
        });
        cy.createBlog({
          title: "third blog",
          author: "mr. cute",
          url: "someurl.com",
        });
      });

      it("one of those can be liked", function () {
        cy.contains("second blog").parent().find("button").as("viewButton");

        cy.get("@viewButton").click();
        cy.contains("second blog")
          .parent()
          .parent()
          .find(".likeButton")
          .as("likeButton");

        cy.get("@likeButton").click();
        cy.contains("second blog")
          .parent()
          .parent()
          .contains("likes")
          .contains("1");
      });

      it("blog can be deleted by the user who created it", function () {
        cy.contains("third blog").parent().find("button").as("viewButton");

        cy.get("@viewButton").click();
        cy.contains("third blog")
          .parent()
          .parent()
          .find(".removeButton")
          .as("removeButton");

        cy.get("@removeButton").click();
        cy.get("html").should("not.contain", "third blog");
      });

      it("blogs order change according to likes", function () {
        cy.contains("second blog").parent().find("button").as("viewButton");

        cy.get("@viewButton").click();
        cy.contains("second blog")
          .parent()
          .parent()
          .find(".likeButton")
          .as("likeButton");

        cy.get("@likeButton").click();
        cy.contains("second blog")
          .parent()
          .parent()
          .contains("likes")
          .contains("1");
        cy.get(".blogDisplay").eq(0).should("contain", "second blog");
      });
    });
  });
});
