import {
  Box,  Flex ,Heading,Text
} from '@chakra-ui/react';
export function Header({ sprintName , description }) {
    return (
      <Box bg="white" p={3} borderRadius="lg"  width="full" mt={2}> {/* Ajoutez un mt={6} pour déplacer les boutons plus bas */}

      <Box p={5} shadow="2xl" borderWidth="1px" mb={4} rounded='3xl'>
            
            <Heading size='md'>
              <Text fontSize='5xl'as='b'>{sprintName ? sprintName : "Default Sprint Name"}</Text>
            </Heading>
            <Heading size='xs'>   
              <Text fontSize='xl' as='samp'>{description ? description : "Default Description"}</Text>        
            </Heading> 
      </Box>

      </Box>
    );
  }
 