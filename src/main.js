//-------------- Jeu des Dés --------------//
/* 
Nous avons un jeu de dés que nous souhaitons automatiser.
Les règles du jeu de dés sont les suivantes:
Il y à 2 participants: 2 joueurs.
Le jeu dure 5 tours.

//** Action à chaque tour:
- Le joueur 1 lance un dès de 6 faces(score 1 à 6).
- Le joueur 2 lance un dès de 6 faces(score 1 à 6).
- Si le joueur 1 fait plus que le joueur2, ajouter 2 pts au score du joueur 1,
- Si le joueur 1 fait le même lancé que le joueur 2, ajouter 1 pts au score des 2 joueurs
- Si le joueur 2 fait plus que le joueur1, ajouter 2 pts au score du joueur 2.
A la fin des 5 tours le gagnant est celui qui a le score le plus élevé.
-> Afficher le gagnant(son nom)et son score(nbr de pts).

** Pour ce faire vous allez créer les classes suivantes:**

//** 1 Des qui va posséder les attributs suivants:**
    nbrface de type number,
    score de type number,
Une méthode lancer qui va retourner un nombre aléatoire(1 à 6).

//** 2 Joueur qui va posséder les attributs suivants:**
    nom de type string,
    valeurLance(score que va faire le dés) de type number,
    des de type Des.
    Une méthode lancerDes -> appeler la méthode lancer(Des).

//** 3 Partie qui va posséder les attributs suivants:**
  - joueur1 de type Joueur,
  - joueur2 de type Joueur,
  - nbrTour de type number,   
  - scoreJ1 de type number,
  - scoreJ2 de type number.
  Une méthode lancerPartie:
  qui va lancer le jeu(5 tours ou nombre de tours assigné) et afficher le gagnant avec son nom

*/

const app = document.getElementById("app");
const bouton = document.getElementById("lancer");

// ajoute une ligne de texte dans la page
function afficher(texte, classe) {
  const p = document.createElement("p");
  p.textContent = texte;
  if (classe) {
    p.classList.add(classe);
  }
  app.appendChild(p);
}

class Des {
  constructor(nbrface) {
    this.nbrface = nbrface;
    this.score = 0;
  }

  lancer() {
    this.score = Math.floor(Math.random() * this.nbrface + 1);
    return this.score;
  }
}

class Joueur {
  constructor(nom, des) {
    this.nom = nom;
    this.valeurLance = 0;
    this.des = des;
  }

  lancerDes() {
    this.valeurLance = this.des.lancer();
    return this.valeurLance;
  }
}

class Partie {
  constructor(joueur1, joueur2, nbrTour = 5) {
    this.joueur1 = joueur1;
    this.joueur2 = joueur2;
    this.nbrTour = nbrTour;
    this.scoreJ1 = 0;
    this.scoreJ2 = 0;
  }

  lancerPartie() {
    app.innerHTML = "";
    for (let i = 0; i < this.nbrTour; i++) {
      afficher("Tour numéro " + (i + 1), "tour");

      // lancer du joueur 1
      const lancerJoueur1 = this.joueur1.lancerDes();
      afficher(lancerJoueur1);

      // lancer du joueur 2
      const lancerJoueur2 = this.joueur2.lancerDes();
      afficher(lancerJoueur2);

      // Ajout des scores à chaque tour + affichage des scores
      if (lancerJoueur1 > lancerJoueur2) {
        this.scoreJ1 += 2;
        afficher(`Tour remporté par ${this.joueur1.nom} !`);
      } else if (lancerJoueur1 === lancerJoueur2) {
        this.scoreJ1++;
        this.scoreJ2++;
        afficher(`Égalité du tour !`);
      } else {
        this.scoreJ2 += 2;
        afficher(`Tour remporté par ${this.joueur2.nom} !`);
      }
      afficher(`Score de ${this.joueur1.nom} : ${this.scoreJ1}`);
      afficher(`Score de ${this.joueur2.nom} : ${this.scoreJ2}`);
    }

    // Calcul des scores et affichage victoire
    if (this.scoreJ1 > this.scoreJ2) {
      afficher(`Victoire de ${this.joueur1.nom} avec ${this.scoreJ1} points !`);
    } else if (this.scoreJ1 < this.scoreJ2) {
      afficher(`Victoire de ${this.joueur2.nom} avec ${this.scoreJ2} points !`);
    } else {
      afficher(
        `Égalité entre ${this.joueur1.nom} et ${this.joueur2.nom} avec un score de ${this.scoreJ1} !`,
      );
    }
  }
}

//création d'une partie avec 2 joueurs et 4 tours

bouton.addEventListener("click", () => {
  const partie1 = new Partie(
    new Joueur("Julie", new Des(6)),
    new Joueur("Bobby", new Des(6)),
    4,
  );

  partie1.lancerPartie();
});
