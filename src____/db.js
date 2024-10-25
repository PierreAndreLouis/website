// src/db.js
import { db } from './firebaseConfig.js'; // Vérifiez que le chemin est correct selon votre structure de dossiers
import { enableIndexedDbPersistence } from 'firebase/firestore';

// Activer la persistance hors ligne
enableIndexedDbPersistence(db)
  .then(() => {
    console.log('Persistence enabled');

    // Mettre en place des écouteurs après que la persistance a été activée
    setupListeners();
  })
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.log('Persistence failed: multiple tabs open at once');
    } else if (err.code === 'unimplemented') {
      console.log('Persistence not available');
    }
  });

// Fonction pour configurer les écouteurs
function setupListeners() {
  const recipeContainer = document.querySelector('.recipes');

  // Écouteur en temps réel
  db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        renderRecipe(change.doc.data(), change.doc.id);
      }
      if (change.type === 'removed') {
        removeRecipe(change.doc.id);
      }
    });
  });

  // Ajouter une nouvelle recette
  const form = document.querySelector('form');
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const recipe = {
      name: form.title.value,
      ingredients: form.ingredients.value
    };

    db.collection('recipes').add(recipe)
      .catch(err => console.log(err));

    form.title.value = '';
    form.ingredients.value = '';
  });

  // Supprimer une recette
  recipeContainer.addEventListener('click', evt => {
    if (evt.target.tagName === 'I') {
      const id = evt.target.getAttribute('data-id');
      db.collection('recipes').doc(id).delete();
    }
  });
}
