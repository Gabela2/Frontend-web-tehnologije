function iscrtajVjezbe(divDOMElement, objekat) {
  var brojVjezbi = objekat.brojVjezbi;
  var brojZadatakaPoVjezbi = objekat.brojZadatakaPoVjezbi;
  //ako je broj vjezbi 0, da imamo neki defaultni prikaz
  //ili ako je broj vjezbi razlicit od broja elemenata u nizu
  if (
    Object.keys(objekat).length === 0 ||
    brojVjezbi === 0 ||
    brojVjezbi != brojZadatakaPoVjezbi.length
  ) {
    brojVjezbi = 4;
    brojZadatakaPoVjezbi = [2, 5, 1, 3];
  }
  divDOMElement.classList.add("main");
  document.body.appendChild(divDOMElement);
  for (var i = 1; i <= brojVjezbi; i++) {
    //kreiramo div u kome cemo dodati p element s nazivom
    var divVjezbe = document.createElement("div");
    divVjezbe.classList.add("vjezba");
    divVjezbe.setAttribute(
      "onClick",
      `iscrtajZadatke(this, ${brojZadatakaPoVjezbi[i - 1]})`
    );
    //kreiramo p element u koji ce imati naziv vjezbe
    var naziv = document.createElement("p");
    naziv.classList.add("tekst");
    naziv.innerHTML = `vjezba ${i}`;

    //dodajemo u div p sa nazivom vjezbe
    divVjezbe.appendChild(naziv);

    //dodajemo u okvir div
    divDOMElement.appendChild(divVjezbe);
  }
}

function iscrtajZadatke(vjezbaDOMelement, brojZadataka) {
  var list = vjezbaDOMelement.classList;
  var a = vjezbaDOMelement.children;
  // da li okvir sadrzi klasu called, znaci da je vec bio ucitavan
  if (!list.contains("called")) {
    var aktivni = document.querySelectorAll(".active");
    aktivni.forEach((el) => {
      el.classList.remove("active");
      el.classList.add("hide");
    });
    var zadaci = document.createElement("div");
    zadaci.classList.add("zadaci");
    zadaci.classList.add("active");
    var pozvani = document.querySelectorAll(".called");
    pozvani.forEach((el) => {
      el.classList.remove("otvoren");
    });
    vjezbaDOMelement.classList.add("otvoren");
    if (brojZadataka > 5) {
      zadaci.style.height = "5rem";
    }
    vjezbaDOMelement.classList.add("called");
    for (var i = 1; i <= brojZadataka; i++) {
      var zadatak = document.createElement("p");
      zadatak.innerHTML = `zadatak ${i}`;
      zadatak.classList.add("zadatak");
      zadaci.appendChild(zadatak);
    }
    vjezbaDOMelement.appendChild(zadaci);
  } else {
    var aktivni = document.querySelectorAll(".active");
    aktivni.forEach((el) => {
      el.classList.remove("active");
      el.classList.add("hide");
    });

    var pozvani = document.querySelectorAll(".called");
    pozvani.forEach((el) => {
      el.classList.remove("otvoren");
    });
    var b = a[1].classList;
    b.remove("hide");
    b.add("active");
    vjezbaDOMelement.classList.add("otvoren");
  }
}
