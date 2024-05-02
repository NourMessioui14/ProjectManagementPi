import React, { useContext } from "react";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineClockCircle } from "react-icons/ai"; // Icons for illustration
import { GlobalContext } from "../../../context/GlobalWrapper";

function DashboardCard({ title, value, icon, colorScheme, percentage }) {
  return (
    <Box
      p={4} // Reduced padding inside the card
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.700")}
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        height: "20px",
        bottom: 1,
        left: 0,
        right: 0,
        bg: colorScheme,
      }}
    >
      <Flex align="center">
        <Box p={2} color="white" borderRadius="lg" bg={colorScheme}> 
          <Icon as={icon} w={5} h={5} /> 
        </Box>
        <Box ml={2} textAlign="left">
          <Text fontSize="xl" fontWeight="bold">{value}</Text>
          <Text>{title}</Text>
        </Box>
      </Flex>
      <Text mt={1} fontSize="sm" color="gray.600" isTruncated> 
        {percentage}
      </Text>
    </Box>
  );
}

function DashboardCards() {
  const { projects } = useContext(GlobalContext);

  return (
    <Flex direction="row" wrap="wrap" gap="250px" marginLeft={10}> {/* Ajout de l'espace entre les cartes */}
      <DashboardCard 
        title="Total Projects"
        value={projects.length}
        icon={AiOutlineShoppingCart}
        colorScheme="blue.500"
      />
      <DashboardCard
        title="Total Users"
        value="10"
        icon={AiOutlineUserAdd}
        colorScheme="green.500"
      />
      <DashboardCard
        title="Claims"
        value="18"
        icon={AiOutlineClockCircle}
        colorScheme="orange.500"
      />
    </Flex>
  );
}

export default DashboardCards;
