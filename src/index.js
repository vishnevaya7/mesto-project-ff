import './pages/index.css';
import { addCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');
addCard()