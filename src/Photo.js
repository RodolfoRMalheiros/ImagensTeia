// Photo.js
import React, { useState } from 'react';
import { FaShoppingCart, FaThumbsUp, FaCommentDots } from 'react-icons/fa'; // Importação dos ícones
import { TiShoppingCart } from "react-icons/ti";
import { GrLike, GrDislike } from "react-icons/gr"
import { TfiCommentAlt } from "react-icons/tfi";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from './Modal'; // Importação do componente Modal



const Photo = ({ photo, addToCart, removeFromCart, toggleLike, isCartOpen}) => {
  const [comments, setComments] = useState([]); // Novo estado para os comentários
  const [newComment, setNewComment] = useState(''); // Novo estado para o novo comentário
  const [isModalOpen, setIsModalOpen] = useState(false); // Novo estado para o modal
  const [isCommentOpen, setIsCommentOpen] = useState(false); // Novo estado para o campo de comentário

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ border: '1px solid #ddd', margin: '10px', padding: '10px', width: 'calc(70% / 3 - 20px)', boxSizing: 'border-box' }}>
      <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={openModal} />
      <h2 style={{ fontSize: '14px', margin: '5px 0' }}>{photo.title}</h2>
      <p style={{ margin: '0' }}>Album: {photo.albumId}</p>
      <p style={{ margin: '0' }}>ID: {photo.id}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', width: 'cal(70%/ 3 - 20px' }}>
  <button onClick={() => isCartOpen ? removeFromCart(photo) : addToCart(photo)} style={{ fontSize: '25px' , margin: '7px'}}>
    {isCartOpen ? <MdDeleteForever /> : <TiShoppingCart />}
  </button>

  <button onClick={() => toggleLike(photo)} style={{ fontSize: '25px' , margin: '7px'}}>
    {photo.liked ? <GrDislike /> : <GrLike />}
  </button>

  <button onClick={() => setIsCommentOpen(!isCommentOpen)} style={{ fontSize: '25px' , margin: '7px' }}>
    <TfiCommentAlt  />
  </button>
</div>



      {isCommentOpen && (
        <>
          <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Adicione um comentário..." />
          <button onClick={handleAddComment}>Adicionar</button>
        </>
      )}

      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <img src={photo.url} alt={photo.title} style={{ maxWidth: '90%', maxHeight: '80%', margin: 'auto', display: 'block' }} />
        <button onClick={() => { addToCart(photo); closeModal(); }}><TiShoppingCart /></button>
      </Modal>
    </div>
  );
};

export default Photo;
