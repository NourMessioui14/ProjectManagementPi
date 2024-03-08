import {  Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Stack,
   } from "@chakra-ui/react"
import { useContext , useState , useEffect } from "react";
import { GlobalContext } from "../context/GlobalWrapper";
import InputsReclamations from "./InputsReclamations";




export default function AddReclamation() {
  
    const { onOpen, isOpen, onClose , AddRecalamation  ,errors, setErrors, Reclamation , UpdateRecalamation} = useContext(GlobalContext);

    //form ta3 add claim
    const [form , setForm]= useState({});
    
    //bech ichouf name w ihot value mte3ha
    const onChangeHandler = (e)=>{
        setForm ({
            ...form, 
            [e.target.name]: e.target.value,
        });
    };

    const onAdd = () => {
        console.log(form)
        AddRecalamation(form , setForm);
    };


    const onUpdate =() => {
      UpdateRecalamation(form, setForm , form._id);
      console.log(form, );
    };


    //kif nbadlou fy reclamation yemchy i3abiha b ereclamation jdyda
    useEffect(() => {
      setForm(Reclamation);

    }, [Reclamation]);



  
    return (
      <>
       
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        
        >
          <DrawerOverlay    />
          <DrawerContent>
            <DrawerCloseButton 
            onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}/>
            <DrawerHeader>Create / update claim</DrawerHeader>
  
            <DrawerBody>
              <Stack spacing={"24px"}>
                <InputsReclamations name =" UserId "   onChangeHandler ={onChangeHandler} value={form?.UserId} errors={errors?.UserId}/>
                <InputsReclamations name =" Category " onChangeHandler ={onChangeHandler}  value={form?.Category}   errors={errors?.Category} />
                <InputsReclamations name =" Subject " onChangeHandler ={onChangeHandler}   value={form?.Subject}  errors={errors?.Subject}/>
                <InputsReclamations name =" Description " onChangeHandler ={onChangeHandler}   value={form?.Description} errors={errors?.Description} />
                 </Stack>
            </DrawerBody>


  
            <DrawerFooter>
              <Button variant='outline' mr={3} 
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}>
                Cancel
              </Button>

              {/* ken thama deja donnees rak bech ta3mel id   sinon ":" na3mlou add
              form._id? onUpdate()                               :    onAdd() */}
              <Button colorScheme='blue' onClick ={()=> (form._id? onUpdate() : onAdd() ) } > Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }