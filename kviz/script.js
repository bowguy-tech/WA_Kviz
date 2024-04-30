$(document).ready(function () {
  ///////////////promene//////////////
  var otazka = 0;
  //pole vsech otazek
  var otazky = [];

  ///////////////objekty///////////////
  class Odpoved {
    constructor(text, vysledek) {
      this.text = text;
      this.vysledek = vysledek;
      this.value = false;
    }

    check(odpoved) {
      return (odpoved = this.vysledek);
    }
  }
  class Otazka {
    constructor(text, odpovedi) {
      // hlavni text napr."vyberte moznost auto"
      this.text = text;
      // pole odpovedi
      this.odpovedi = odpovedi;
    }
  }

  ///////funkce///////////

  function clear() {
    var otazky_box = $("#otazky-box")[0];
    otazky_box.innerHTML = "";
  }

  ///pro tlacitka///
  function dalsi() {
    if (otazka == otazky.length - 1) {
      alert("toto je posledni otazka");
    } else {
      otazka++;
    }
  }

  function posledni() {
    if (otazka == 0) {
      alert("toto je prvni otazka");
    } else {
      otazka--;
    }
  }

  /////aplikace funkce k tlacitku//////

  $("#dalsi").click(function () {
    dalsi();

    clear();
    generace(otazka);
    nastavit_hodnoty();
  });

  $("#posledni").click(function () {
    posledni();

    clear();
    generace(otazka);
    nastavit_hodnoty();
  });

  $("#ohodnotit").click(function () {
    clear();
    vysledky();
    nastavit_hodnoty();

    $("#dalsi")[0].disabled = "true";
    $("#posledni")[0].disabled = "true";
    $("#ohodnotit")[0].disabled = "true";
  });

  ///generovani otazek na strance///

  function generace(cislo_otazky, vysledek = false) {
    this.otazka = otazky[cislo_otazky];
    var otazky_box = $("#otazky-box")[0];

    this.vysledek = vysledek;

    //box
    var nova_otazka = document.createElement("fieldset");

    //nadpis
    var text = document.createElement("h2");
    text.innerHTML = this.otazka.text;
    nova_otazka.appendChild(text);

    //odpovedi
    for (i = 0; i < this.otazka.odpovedi.length; i++) {
      var odpoved = document.createElement("label");

      var button = document.createElement("input");
      button.value = this.otazka.odpovedi[i].text;
      button.name = cislo_otazky;
      button.type = "checkbox";

      //jestli je vysledek
      if (vysledek) {
        button.disabled = true;
        if (this.otazka.odpovedi[i].vysledek) {
          //spravna
          odpoved.style.background = "#04FF00";
        } else {
          //nespravna
          odpoved.style.background = "red";
        }
      }
      odpoved.appendChild(button);
      odpoved.innerHTML += this.otazka.odpovedi[i].text;
      nova_otazka.appendChild(odpoved);
    }

    otazky_box.appendChild(nova_otazka);

    checkboxy = otazky_box.children[cislo_otazky];

    
    for (i = 0; i < this.otazka.odpovedi.length; i++) {
      check = $("#otazky-box")[0].children[0].children[i + 1].children[0];
      check.click(function () {
        chekbox(otazka, i);
      });
    }
  }

  //funkce pro ulozeni odpvedi
    function chekbox(otazka, poradi) {
      otazky[otazka].odpovedi[poradi].value = !otazky[otazka].odpovedi[poradi].value;
    }

    function chekboxfunc(question,order) {
      return function() {
        chekbox(question, order)
      };
    }

  function nastavit_hodnoty() { 
    if ($("#otazky-box")[0].children.length == 1) {
      for (jy = 0; jy < this.otazka.odpovedi.length; jy++) {
        button = $("#otazky-box")[0].children[0].children[jy + 1].children[0];
        button.checked = otazky[otazka].odpovedi[jy].value;

        //pridani funkci k jednotlivym tlacitek
        button.addEventListener("click",chekboxfunc(otazka,jy));
      }
    } else {
      for (ix = 0; ix < $("#otazky-box")[0].children.length; ix++) {
        for (jy = 0; jy < this.otazka.odpovedi.length; jy++) {
          $("#otazky-box")[0].children[ix].children[jy + 1].children[0].checked = otazky[ix].odpovedi[jy].value;
        }
      }
    }

  }

  ///generovani vysledku///
  function vysledky() {
    for (q = 0; q < 3; q++) {
      generace(q, true);
    }
  }

  //////////////////////////////////////////////////
  ///////////////////////MAIN///////////////////////
  //////////////////////////////////////////////////

  ///vytvoreni otazek
  otazky[0] = new Otazka("co zacina na A", [
    new Odpoved("auto", true),
    new Odpoved("motorka", false),
  ]);
  otazky[1] = new Otazka("co zacina na B", [
    new Odpoved("bagr", true),
    new Odpoved("Bobr", true),
  ]);
  otazky[2] = new Otazka("co zacina na C", [
    new Odpoved("ahoj", false),
    new Odpoved("pa pa", false),
  ]);

  //vygeneruje prvni otazku
  generace(0);
  nastavit_hodnoty();
});
