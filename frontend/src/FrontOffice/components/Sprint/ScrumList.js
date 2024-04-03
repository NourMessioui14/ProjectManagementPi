import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Draggable from 'react-draggable';
<<<<<<< HEAD
import { useLocation } from "react-router-dom"; // Importing useLocation from react-router-dom
import {Button} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import SelectTicket from './SelectTicket'; // Importez SelectTicket

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
              <Button  onClick={() => handleDeleteColumn(list.id)}>Delete Column</Button>
            )}
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
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDeleteCard(list.id, card.id)}
                      >
                        Delete
                      </button>
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
    marginTop: '100px'
  },
  listContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: '20px',
    padding: '10px',
    width: '30vw',
    minHeight: "100vh",
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
=======
export default function ScrumList() {

  const [board, setBoard] = useState([])

  useEffect(()=>{
    let data = window.localStorage.getItem("data")
    if(data){
     setBoard(JSON.parse(data))
    }else{
     setBoard([
      {
       id: 1,
       title: 'To Do',
       cards: [
        {
         id: 1,
         title: 'Learn React',
         description: 'Learn the fundamentals of React'
        },
        {
         id: 2,
         title: 'Learn Firebase',
         description: 'Learn the fundamentals of Firebase'
        }
       ]
      },
      {
       id: 2,
       title: 'In Progress',
       cards: [
        {
         id: 3,
         title: 'Learn React Native',
         description: 'Learn the fundamentals of React Native'
        },
        {
         id: 4,
         title: 'Learn GraphQL',
         description: 'Learn the fundamentals of GraphQL'
        }
       ]
      },
      {
       id: 3,
       title: 'Completed',
       cards: [
        {
         id: 5,
         title: 'Learn Node.js',
         description: 'Learn the fundamentals of Node.js'
        },
        {
         id: 6,
         title: 'Learn Express',
         description: 'Learn the fundamentals of Express'
        }
       ]
      }
     ])
    }
   },[])
  
   useEffect(()=>{
    if (board.length > 0) window.localStorage.setItem("data",JSON.stringify(board))
   },[board])
   
  return (
    <div>
     <Header />
     <div style={styles.boardContainer}>
      {board.map((list) => {
       return (
        <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
         <h2>{list.title}</h2>
         <button
          style={styles.newCard}
          onClick={() => {
           let temp_boards = [...board]
           for (let i = 0; i < temp_boards.length; i++) {
            if (temp_boards[i].id === list.id) {
             temp_boards[i].cards.push({
              id: new Date().getTime(),
              title: 'New Card',
              description: 'New Card Description'
             })
            }
           }
           setBoard(temp_boards)
          }}
         >+ New Card</button>
         {list.cards.map((card) => {
          return (
           <Draggable
            key={card.id}
            onStop={(e,) => {
              let allLists = document.querySelectorAll('.list-container');
           for (let i = 0; i < allLists.length; i++) {
            let list = allLists[i];
            let rect = list.getBoundingClientRect();
            let data = {
             x: e.clientX,
             y: e.clientY
            }
            let flag = false
            if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
             let final_list_id = list.id.split('_')[1];
             let final_card_id = card.id;
             let temp_boards = [...board]
             for (let boardIndex = 0; boardIndex < temp_boards.length; boardIndex++) {
              for (let cardIndex = 0; cardIndex < temp_boards[boardIndex].cards.length; cardIndex++) {
               if (temp_boards[boardIndex].cards[cardIndex].id === final_card_id) {
                temp_boards[boardIndex].cards.splice(cardIndex, 1)
               }
              }
             }
             for (let boardIndex = 0; boardIndex < temp_boards.length; boardIndex++) {
              if (temp_boards[boardIndex].id === parseInt(final_list_id)) {
               temp_boards[boardIndex].cards.push(card)
              }
             }
             flag = true
             setBoard(temp_boards)
            }
           }
            }}
           >
            <div style={styles.cardContainer}>
             <input type={"text"} style={styles.title} value={card.title}
              onChange={(e) => {
                let temp_boards = [...board]
            for (let i = 0; i < temp_boards.length; i++) {
              for (let j = 0; j < temp_boards[i].cards.length; j++) {
               if (temp_boards[i].cards[j].id === card.id) {
                temp_boards[i].cards[j].title = e.target.value
               }
              }
             }
             setBoard(temp_boards)
              }}
             />
             <input type={"text"} style={styles.description} value={card.description}
              onChange={(e) => {
                let temp_boards = [...board]
            for (let i = 0; i < temp_boards.length; i++) {
              for (let j = 0; j < temp_boards[i].cards.length; j++) {
               if (temp_boards[i].cards[j].id === card.id) {
                temp_boards[i].cards[j].description = e.target.value
               }
              }
             }
             setBoard(temp_boards)
              }}
             />
            </div>
           </Draggable>
          )
         })}
        </div>
       )
      })}
     </div>
    </div>
   );
  }

  const styles = {
    boardContainer: {
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-around',
     marginTop: '100px'
    },
    listContainer: {
     backgroundColor: '#ecf0f1',
     borderRadius: '5px',
     padding: '10px',
     width: '30vw',
     minHeight: "100vh",
    },
    cardContainer: {
     backgroundColor: '#ffffff',
     borderRadius: '5px',
     padding: '10px',
     margin: '10px 0',
     minHeight: "100px",
     boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
     display:"flex",
     flexDirection:"column",
   
    },
    title: {
     padding: 0,
     margin: 0,
     border:"none",
     fontSize:"20px",
     fontWeight:"bold",
    },
    description: {
     padding: 0,
     margin: 0,
     border:"none",
     fontSize:"15px",
   fontWeight:"bold",
    },
    newCard:{
     backgroundColor: '#2ecc71',
     color: '#ffffff',
     border: 'none',
     width:"100%",
     padding: '10px',
     borderRadius: '5px',
     cursor: 'pointer',
     outline: 'none'
   
    },
   }
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
