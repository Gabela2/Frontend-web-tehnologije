let assert = chai.assert;
describe("Vjezbe", function () {
  describe("Iscrtaj vjezbe()", function () {
    //Prvi test za fiju Iscrtaj vjezbu
    it("U slučaju da se pošalje prazan objekat", function () {
      iscrtajVjezbe(document.createElement("div"), {});
      let brojIscrtanihVjezbi = document.getElementsByClassName("vjezba");
      assert.equal(
        brojIscrtanihVjezbi.length,
        4,
        "Broj div elemnata treba biti 4, jer je to default u slučaju pogrešnog ulaza"
      );

      document.body.removeChild(document.body.lastChild);
    });

    it("Kada se pošalje 0 za broj vjezbi po defoultu treba se kreirati div sa 4 vjezbe(neispravni parametri)", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 0,
        brojZadatakaPoVjezbi: [2, 2, 2, 2, 2],
      });
      let brojIscrtanih = document.getElementsByClassName("vjezba");
      assert.equal(brojIscrtanih.length, 4, "Broj div elemnata treba biti 4");
      document.body.removeChild(document.body.lastChild);
    });

    it("Kada se pošalje broj vjezbi različit od broja elemenata niza po defoultu treba se kreirati div sa 4 vjezbe(neispravni parametri)", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 0,
        brojZadatakaPoVjezbi: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      });
      let brojIscrtanih = document.getElementsByClassName("vjezba");
      assert.equal(brojIscrtanih.length, 4, "Broj div elemnata treba biti 4");
      document.body.removeChild(document.body.lastChild);
    });
  });

  describe("Iscrtaj zadatke()", function () {
    //Prvi test za fiju Iscrtaj vjezbu
    it("Za ovaj poziv, nakon što se klinke na svaku vjezbu, treba biti iscrtanih ukupno 10 elemenata sa zadacima", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 5,
        brojZadatakaPoVjezbi: [2, 2, 2, 2, 2],
      });
      let brojIscrtanihVjezbi = document.getElementsByClassName("vjezba");
      for (let i = 0; i < brojIscrtanihVjezbi.length; i++) {
        brojIscrtanihVjezbi[i].click();
      }
      let brojIscrtanihZadataka = document.getElementsByClassName("zadatak");
      assert.equal(
        brojIscrtanihZadataka.length,
        10,
        "Broj div elemnata sa zadacima treba biti 5"
      );

      document.body.removeChild(document.body.lastChild);
    });

    it("Nakon ovog poziva, treba biti 5 div elemenata koje sadrze klasu called, jer to znači da se samo prilikom prvog poziva iscrtavaju zadaci, a svaki sljedeci put kad se klikne samo se prikaze skiriveno", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 5,
        brojZadatakaPoVjezbi: [2, 2, 2, 2, 2],
      });
      let brojIscrtanihVjezbi = document.getElementsByClassName("vjezba");
      for (let i = 0; i < brojIscrtanihVjezbi.length; i++) {
        brojIscrtanihVjezbi[i].click();
      }
      let brojPozvanih = document.getElementsByClassName("called");
      assert.equal(
        brojPozvanih.length,
        5,
        "Broj elemenata koje sadrze klasu called treba biti 5, jer je 5 vjezbi i na svaku se kliknulo"
      );
      document.body.removeChild(document.body.lastChild);
    });

    it("Da li su ostale vjezbe sa zadacima sakrivene nakon poziva, dok je treća po redu vjezba aktivna", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 5,
        brojZadatakaPoVjezbi: [3, 4, 5, 6, 7],
      });
      let brojIscrtanihVjezbi = document.getElementsByClassName("vjezba");
      for (let i = 0; i < brojIscrtanihVjezbi.length; i++) {
        brojIscrtanihVjezbi[i].click();
      }
      brojIscrtanihVjezbi[2].click();
      let zadaci = document.getElementsByClassName("zadaci");
      let klaseTreceVjezbe = zadaci[2].classList;
      let brojSkrivenih = document.getElementsByClassName("hide");
      assert.equal(
        brojSkrivenih.length,
        4,
        "Nakon sto se na sve vjezbe kliknulo, 4 trebaju biti 'skrivene' tj. sa klasom hide"
      );
      assert.equal(
        klaseTreceVjezbe.contains("active"),
        true,
        "Pošto se na treću vjezbu posljednji put kliknulo, onda treba da sadrzi klasu active"
      );
      document.body.removeChild(document.body.lastChild);
    });

    it("Visina div elementa sa zadacima koji imaju preko 5 zadataka treba da bude 5ram, da ne bi ruzno izgledalo", function () {
      iscrtajVjezbe(document.createElement("div"), {
        brojVjezbi: 6,
        brojZadatakaPoVjezbi: [2, 5, 10, 3, 5, 6],
      });
      // treci element ima preko 5 vjezbi
      let brojIscrtanihVjezbi = document.getElementsByClassName("vjezba");
      brojIscrtanihVjezbi[2].click();
      let treciElement = document.getElementsByClassName("zadaci");
      assert.equal(
        treciElement[0].style.height,
        "5rem",
        "Pošto se na treću vjezbu posljednji put kliknulo, onda treba da sadrzi klasu active"
      );
      document.body.removeChild(document.body.lastChild);
    });
  });
});
