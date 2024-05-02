import React, { useState, useEffect,useContext } from "react";
import { Header } from "./Header";
import Draggable from 'react-draggable';

import { useLocation,useNavigate } from "react-router-dom"; // Importing useLocation from react-router-dom
import {Button,Text,Menu, MenuButton, MenuList, MenuItem,Textarea,Heading,IconButton,Badge,Tooltip} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import SelectTicket from './SelectTicket'; // Importez SelectTicket
import NavbarFront from '../../NavbarFront';
import { MdDelete } from "react-icons/md";
import { SketchPicker } from 'react-color';
import {ArrowBackIcon, ChevronDownIcon,EditIcon } from '@chakra-ui/icons'
import { MdMoreVert } from "react-icons/md";

export default function ScrumList() {
  const [board, setBoard] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sprintName = searchParams.get("name");
  const description = searchParams.get("description");
  const sprintId = searchParams.get("id");
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedColor, setSelectedColor] = useState('#ecf0f1');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isColorCardPickerOpen, setIsColorCardPickerOpen] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    localStorage.setItem('selectedColor', color.hex); // Enregistrez la couleur sélectionnée dans le stockage local
  };

  const [cardColors, setCardColors] = useState({});
  const handleCardColorChange = (cardId, color) => {
    setCardColors(prevColors => ({
      ...prevColors,
      [cardId]: color
    }));
    localStorage.setItem(`cardColor_${cardId}`, color); // Enregistrez la couleur sélectionnée dans le stockage local
  };

  const handleColorCardPickerOpen = (cardId) => {
    setIsColorCardPickerOpen(cardId); // Mettez à jour l'état avec l'ID de la carte
  };
  
  const handleColorCardPickerClose = () => {
    setIsColorCardPickerOpen(null); // Réinitialisez l'état à null pour fermer tous les SketchPickers
  };
  

  useEffect(() => {
    const storedColors = {};
    // Parcourez toutes les cartes pour récupérer leurs couleurs du stockage local
    board.forEach(list => {
      list.cards.forEach(card => {
        const storedColor = localStorage.getItem(`cardColor_${card.id}`);
        if (storedColor) {
          storedColors[card.id] = storedColor;
        }
      });
    });
    setCardColors(storedColors);
  }, [board]);
  useEffect(() => {
    // Parcourez toutes les entrées de cardColors et enregistrez-les dans le stockage local
    Object.entries(cardColors).forEach(([cardId, color]) => {
      localStorage.setItem(`cardColor_${cardId}`, color);
    });
  }, [cardColors]);

  
  useEffect(() => {
    let data = window.localStorage.getItem("data");
    if (data) {
      setBoard(JSON.parse(data));
    } else {
      setBoard([
        {
          id: 1,
          title: 'To do',
          cards: []
        },
        {
          id: 2,
          title: 'In progress',
          cards: []
        },
        {
          id: 3,
          title: 'Done',
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
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
      setSelectedColor(storedColor);
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
    <div style={{ marginTop: '140px' }}>
     
      <NavbarFront/> 
    <div>
        <Header sprintName={sprintName} description={description} />
        <Button colorScheme='blackAlpha' ml={4} size='sm' leftIcon={<ArrowBackIcon fontSize={'20px'} />} onClick={() => navigate(-1)}>Back to Sprints</Button>

        <Menu >
          <MenuButton colorScheme='blackAlpha'
                      borderRadius='2xl'
                    style={styles.newColumn} as={Button} rightIcon={<ChevronDownIcon />}>
            Customize my table
          </MenuButton>
          <MenuList minWidth='450px'>
            <MenuItem 
                onClick={handleAddScrumClick}>              
                Add Column
            </MenuItem>
            <MenuItem onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>              
                Pick Columns Color
            </MenuItem>
          </MenuList>
        </Menu>
        {isColorPickerOpen && (
          <SketchPicker color={selectedColor} onChange={handleColorChange} />
        )}

        <div>
      <div style={styles.boardContainer}>
        {board.map((list) => {
            console.log("ID de la liste :", list.id); // Ajout du console.log pour déboguer

          return (
<div id={`list_${list.id}`} key={list.id} className="list-container" style={{ ...styles.listContainer, backgroundColor: selectedColor }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>

              <h2>
              {list.id > 3 ? ( // Vérifier si l'index est supérieur ou égal à 3 (à partir de la quatrième colonne)
                // Champ d'entrée modifiable pour le titre de la colonne
                <input
                  type="text"
                  value={list.title}
                  onChange={(e) => handleUpdateColumnTitle(list.id, e.target.value)}
                  style={{...styles.transparentInput,    fontWeight: 500, // Mettre le texte en gras
                }}                
                  />
              ) : (
                // Sinon, afficher simplement le titre de la colonne
                <span style={{fontWeight: 500}}>{list.title}</span>
              )}
              </h2>
              {list.id > 3 && ( 
                                          <Tooltip hasArrow label='Delete Column' bg='red.600' placement='right'>

              <Button
              colorScheme='blackAlpha' 
    variant='link'          
                onClick={() => handleDeleteColumn(list.id)}
                style={{ fontSize: '1.5rem', padding: '0.5rem', width: '1rem', height: '2rem' ,marginTop: '1.5rem', marginLeft: '-4rem', right: '0'}}
              >
                <MdDelete />
              </Button>
              </Tooltip>
                )}
            </div>
                  {list.id === 1 && ( // Condition pour afficher le bouton "New Card" uniquement pour la première liste

          <Button
          colorScheme='blackAlpha'
          borderRadius='2xl'
            style={styles.newCard}
            onClick={handleNewCardClick}
          >+ New Ticket</Button>
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
                    <div key={card.id} className="card-container" style={{ ...styles.cardContainer, backgroundColor: cardColors[card.id] || '#ffffff' }}>

                    
                    
                      <div style={{ display: 'flex', alignItems: 'center' }}>

                        <span
                          type={"text"}
                          style={styles.description}
                          
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
                          
                        >{card.description}</span>
                        
          <Badge style={{ position: 'absolute', top: '10px', right: '10px' }}>{card.owner}</Badge>
          

                        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>


                        

                        <Menu>
                        <Tooltip hasArrow label='Click to show more options' bg='red.600' placement='right'>

                          <MenuButton size='sm' colorScheme='blackAlpha' as={IconButton} aria-label="Options" icon={<MdMoreVert />} /></Tooltip>
                          <MenuList minWidth='20px' >
                          <Tooltip hasArrow label='Delete Card' bg='red.600' placement='right'>
                            <MenuItem  onClick={() => handleDeleteCard(list.id, card.id)}> 
                              <MdDelete />
                            </MenuItem>
                            </Tooltip>
                            <Tooltip hasArrow label='Choose Card Color' bg='blue.600' placement='right'>

                            <MenuItem onClick={() => {
                              const nextColorPickerState = isColorCardPickerOpen === card.id ? null : card.id;
                              setIsColorCardPickerOpen(nextColorPickerState);
                            }} >  
                              <EditIcon/>
                            </MenuItem>
                            </Tooltip>

                          
                          </MenuList>
                        </Menu>
                      </div>
                      {isColorCardPickerOpen === card.id && (
                        <SketchPicker 
                          color={cardColors[card.id] || '#ffffff'} 
                          onChange={(color) => handleCardColorChange(card.id, color.hex)} 

                      />
                      )}
   
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
      
            <SelectTicket isOpen={isOpen} onClose={() => setIsOpen(false)} setBoard={setBoard} id={sprintId} /> 

      </div>
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
    border: 'none',
    width: "100%",
    padding: '10px',
    cursor: 'pointer',
    outline: 'none'
  },
  newColumn: {
    border: 'none',
    width: "30%",
    padding: '10px',
    cursor: 'pointer',
    outline: 'none',
    display: 'flex',
  justifyContent: 'center',
  margin: '0 auto', // Pour centrer horizontalement

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