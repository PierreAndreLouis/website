// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig.js'; // Vérifiez que le chemin est correct
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Importez updateDoc
import { BiTrashAlt } from 'react-icons/bi';
import { FaRegEdit, FaPlus } from 'react-icons/fa';

const Home = () => {
    const [recepies, setRecepies] = useState([]);
    const [addRecepieOpen, setAddRecepieOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newTitre, setNewTitre] = useState('');
    const [newIngrediants, setNewIngrediants] = useState('');

    // Mettre en place un écouteur en temps réel pour les recettes
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
            const recipesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRecepies(recipesData);
        });

        return () => unsubscribe(); // Nettoyer l'écouteur
    }, []);

    const handleAddOrUpdateRecepie = async (e) => {
        e.preventDefault();

        // Vérifier si l'utilisateur est hors ligne
        if (!navigator.onLine) {
            alert('Vous êtes hors ligne. Vos modifications seront synchronisées lorsque vous serez en ligne.');
            // Réinitialiser les champs après avoir enregistré les modifications
            setAddRecepieOpen(false);

        }

        try {
            if (editingId) {
                // Logique pour mettre à jour une recette
                const recipeRef = doc(db, 'recipes', editingId);
                await updateDoc(recipeRef, { title: newTitre, ingredients: newIngrediants });
            } else {
                // Logique pour ajouter une nouvelle recette
                await addDoc(collection(db, 'recipes'), { title: newTitre, ingredients: newIngrediants });
            }



            // Réinitialiser les champs après avoir enregistré les modifications
            setAddRecepieOpen(false);
            setEditingId(null);
            setNewTitre('');
            setNewIngrediants('');
        } catch (err) {
            // Gestion des erreurs (par exemple, en mode hors ligne)
            console.error("Erreur lors de la mise à jour ou de l'ajout de la recette : ", err);
            alert("Une erreur s'est produite. Vos modifications seront sauvegardées une fois que vous serez en ligne.");
        }
    };


    // // Supprimer une recette
    // const handleDeleteRecepie = async (id) => {
    //     // Vérifier si l'utilisateur est hors ligne
    //     if (!navigator.onLine) {
    //         alert('Vous êtes hors ligne. La suppression sera synchronisées lorsque vous serez en ligne.');
    //     }
    //     const recipeRef = doc(db, 'recipes', id);
    //     await deleteDoc(recipeRef);
    // };

    const handleDeleteRecepie = async (id) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?");

        if (confirmed) {
            const recipeRef = doc(db, 'recipes', id);
            await deleteDoc(recipeRef);
        } else {
            console.log("Suppression annulée");
        }
    };


    return (

        <div className='min-h-screen bg-gray-100 px-2 sm:px-8 sm:pt-5  '>
            <h1 className='text-center  font-bold text-2xl py-10 pt-20 text-gray-700 '>Liste de vos recettes.</h1>

            <div className='flex flex-col gap-3'>
                {recepies.map((recipe, index) => (
                    <div key={index} className='bg-white p-3 rounded-xl shadow-sm flex items-start gap-2 md:gap-6 relative'>
                        <img className='w-14' src="/img/dish.png" alt='recipe' />
                        <div className='w-full'>
                            <h3 className='font-bold text-gray-600'>{recipe.title}</h3>
                            <p className='text-gray-500'>{recipe.ingredients}</p>

                            <div className='flex gap-2 justify-end w-full'>

                                <FaRegEdit
                                    onClick={() => {
                                        setEditingId(recipe.id);
                                        setNewTitre(recipe.title);
                                        setNewIngrediants(recipe.ingredients);
                                        setAddRecepieOpen(true);
                                    }}
                                    className='text-xl  text-gray-500  cursor-pointer hover:text-gray-600'
                                />

                                <BiTrashAlt
                                    onClick={() => handleDeleteRecepie(recipe.id)}  // Pass recipe ID to delete function
                                    className='text-xl  text-red-400 cursor-pointer hover:text-red-600'
                                />

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button Add new recipes */}
            {/* <div className='flex justify-center mt-10 mx-auto'> */}
                <div className='fixed -top-8 right-6 sm:right-14 md:right-20 justify-center mt-10 mx-auto'>
                <div onClick={() => {
                    setAddRecepieOpen(!addRecepieOpen);
                    setEditingId(null);
                    setNewTitre('');
                    setNewIngrediants('');
                }} className='w-10 h-10 rounded-full bg-orange-500 flex justify-center items-center cursor-pointer '>
                    <FaPlus className='text-white' />
                </div>
            </div>

            {/* Dark background */}
            <div onClick={() => setAddRecepieOpen(false)} className={`${addRecepieOpen ? "fixed" : "hidden"} inset-0 bg-black/50`} ></div>


            {/* Slider add new recipes */}
            {/* <form className=''> */}
            <form onSubmit={handleAddOrUpdateRecepie} className={`${addRecepieOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 border-2 transition-all w-[100vw] sm:w-[20rem] h-screen p-6 bg-white `}>
                <h3 className='text-gray-800 font-semibold border-b mt-12 text-xl pb-2 border-b-gray-300'>{editingId ? "Modifier Recette" : "Nouvelle Recette"}</h3>

                <div className='mt-8'>
                    <label className='text-gray-500 mt-9 text-xl'>Titre de la recette</label>
                    <input
                        value={newTitre}
                        onChange={(e) => setNewTitre(e.target.value)}
                        className='border-b pb-1 border-b-orange-300 w-full focus:outline-none text-xl'
                        type="text"
                        required
                        placeholder='e.g. Viande de cabrit'
                    />
                </div>

                <div className='mt-12'>
                    <label className='text-gray-500 text-xl'>Ingrédients</label>
                    <input
                        value={newIngrediants}
                        onChange={(e) => setNewIngrediants(e.target.value)}
                        className='border-b pb-1 border-b-orange-300 w-full focus:outline-none text-xl'
                        type="text"
                        required
                        placeholder='e.g. huile, maggi, sel'
                    />
                </div>
                <div className='flex gap-2 w-full max-w-[16rem]'>
                    <button type="submit" className='mt-12 bg-orange-500 text-white text-xl py-2 rounded-sm w-full'>
                        {editingId ? "Modifier" : "Ajouter"}
                    </button>
                    <button onClick={() => setAddRecepieOpen(false)} className='mt-12  text-black text-xl border border-black  rounded-sm w-full'>
                        close
                    </button>
                </div>
            </form>
            {/* </form> */}
        </div>
    );
};

export default Home;
