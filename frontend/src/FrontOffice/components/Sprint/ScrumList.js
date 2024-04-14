import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Draggable from 'react-draggable';

import { useLocation } from "react-router-dom"; // Importing useLocation from react-router-dom
import {Button} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import SelectTicket from './SelectTicket'; // Importez SelectTicket
import NavbarFront from '../../NavbarFront';
import { MdDelete } from "react-icons/md";


export default function ScrumList() {
  const [board, setBoard] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sprintName = searchParams.get("name");
  const description = searchParams.get("description");

  useEffect(() => {
    let data = window.localStorage.getItem("data");
    if (data) {
      setBoard(JSON.parse(data));
    } else {
      setBoard([
        {
          id: 1,
          title: 'To Do',
          cards: []
        },
        {
          id: 2,
          title: 'In Progress',
          cards: []
        },
        {
          id: 3,
          title: 'Completed',
          cards: []
        },
        {
          id: 4,
          title: 'Fourth List', // Titre de la quatrième liste
          cards: [] // Aucune carte initialement
        }
      ]);
    }
  }, []);
  

  

  useEffect(() => {
    if (board.length > 0) window.localStorage.setItem("data", JSON.stringify(board));
  }, [board]);

  const handleDeleteCard = (listId, cardId) => {
    const updatedBoard = board.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    });
    setBoard(updatedBoard);
  };
  // const { onOpen } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false); // Variable d'état pour contrôler l'ouverture du tiroir

  const handleNewCardClick = () => {
    setIsOpen(true); // Ouvrez le tiroir SelectTicket lorsque le bouton New Card est cliqué
  };
  

  const handleAddScrumClick = () => {
    const newColumn = {
      id: board.length + 1,
      title: 'New Column',
      cards: []
    };
    setBoard(prevBoard => [...prevBoard, newColumn]);
  };

  const handleDeleteColumn = (columnId) => {
    if (columnId > 3) {
      const updatedBoard = board.filter(column => column.id !== columnId);
      setBoard(updatedBoard);
    } else {
      console.log("You can't delete the first three columns.");
      }
  };

  const handleUpdateColumnTitle = (columnId, newTitle) => {
    const updatedBoard = board.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          title: newTitle
        };
      }
      return column;
    });
    setBoard(updatedBoard);
  };
  

  return (
    <div>

            <Header sprintName={sprintName} description={description} />
      
            <Button colorScheme="teal" variant="outline" maxW={'300px'} minW="150px" onClick={handleAddScrumClick}>
  Add Column
</Button>

        <div>
      <div style={styles.boardContainer}>
        {board.map((list) => {
            console.log("ID de la liste :", list.id); // Ajout du console.log pour déboguer

          return (
            <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>

              <h2>
              {list.id > 3 ? ( // Vérifier si l'index est supérieur ou égal à 3 (à partir de la quatrième colonne)
                // Champ d'entrée modifiable pour le titre de la colonne
                <input
                  type="text"
                  value={list.title}
                  onChange={(e) => handleUpdateColumnTitle(list.id, e.target.value)}
                  style={styles.transparentInput}                />
              ) : (
                // Sinon, afficher simplement le titre de la colonne
                list.title
              )}
            </h2>
              {list.id > 3 && ( // Vérifier si l'index est supérieur ou égal à 3 (à partir de la quatrième colonne)
              // <Button  onClick={() => handleDeleteColumn(list.id)}>Delete Column</Button>
              //delete column
              <Button          
                onClick={() => handleDeleteColumn(list.id)}
                style={{ fontSize: '1.5rem', padding: '0.5rem', width: '1rem', height: '2rem' ,marginTop: '1.5rem', marginLeft: '-4rem'}}
              >
                <MdDelete />
              </Button>
            )}
            </div>
                  {list.id === 1 && ( // Condition pour afficher le bouton "New Card" uniquement pour la première liste

          <button
            style={styles.newCard}
            onClick={handleNewCardClick}
          >+ New Ticket</button>
          )}
              {list.cards.map((card) => {
                return (
                  <Draggable
                  key={card.id} // Utilisez une clé unique en combinant l'ID de la liste et l'ID de la carte
                  onStop={(e,) => {
                      let allLists = document.querySelectorAll('.list-container');
                      let final_list_id = null;
                      let final_card_id = card.id;
                      
                      for (let i = 0; i < allLists.length; i++) {
                        let list = allLists[i];
                        let rect = list.getBoundingClientRect();
                        let data = {
                          x: e.clientX,
                          y: e.clientY
                        };
                    
                        if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
                          final_list_id = list.id.split('_')[1];
                          break;
                        }
                      }
                    
                      if (final_list_id !== null) {
                        setBoard(prevBoard => {
                          const temp_boards = prevBoard.map(column => {
                            const updatedColumn = { ...column };
                            updatedColumn.cards = column.cards.filter(c => c.id !== final_card_id);
                            return updatedColumn;
                          });
                    
                          for (let i = 0; i < temp_boards.length; i++) {
                            if (temp_boards[i].id === parseInt(final_list_id)) {
                              temp_boards[i].cards.push(card);
                              break;
                            }
                          }
                    
                          return temp_boards;
                        });
                      }
                    }}
                    
                   >
                    <div style={styles.cardContainer}>
                    {/* <Button colorScheme='pink' onClick={() => handleDeleteCard(list.id, card.id)}>
            <MdDelete />
          </Button> */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>

                      <input
                          type={"text"}
                          style={styles.description}
                          value={card.description}
                          onChange={(e) => {
                            let temp_boards = [...board];
                            for (let i = 0; i < temp_boards.length; i++) {
                              for (let j = 0; j < temp_boards[i].cards.length; j++) {
                                if (temp_boards[i].cards[j].id === card.id) {
                                  temp_boards[i].cards[j].description = e.target.value;
                                }
                              }
                            }
                            console.log(temp_boards); // Vérifier si temp_boards est correctement mis à jour
                            setBoard(temp_boards);
                          }}
                        />
                        <Button
                        
                        onClick={() => handleDeleteCard(list.id, card.id)}
                        style={{ fontSize: '1.5rem', padding: '0.5rem', width: '1rem', height: '2rem' ,marginTop: '1.5rem', marginLeft: '2rem'}}
                      >
                        <MdDelete />
                      </Button>
                      </div>
                    </div>
                  </Draggable>
                );
              })}
            </div>
          );
        })}
        
      </div>

      </div>
      
            <SelectTicket isOpen={isOpen} onClose={() => setIsOpen(false)} setBoard={setBoard} /> 

      </div>
  );
}

const styles = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '50px'
  },
  listContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: '20px',
    padding: '20px',
    width: '30vw',
    minHeight: "80vh",
    marginRight: '30px', // Ajoutez un espace entre les colonnes

  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px 0',
    minHeight: "100px",
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
    display: "flex",
    flexDirection: "column",
  },
  title: {
    padding: 0,
    margin: 0,
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  description: {
    padding: 0,
    margin: 0,
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
  },
  newCard: {
    backgroundColor: 'rgb(158, 129, 254)',
    color: '#ffffff',
    border: 'none',
    width: "100%",
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '5px',
    alignSelf: 'flex-start',
  },
  transparentInput: {
    backgroundColor: 'transparent',
    border: 'none', // Optionnel : pour supprimer la bordure de l'input
  }
  
  
};


   
