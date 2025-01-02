import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Group } from "../types/group";

interface MyGroupStoryScrollProps {
  groups: Group[];
  selectedGroupId: number;
  onSelectGroup: (group: Group) => void;
}

export default function MyGroupStoryScroll({
  groups,
  selectedGroupId,
  onSelectGroup,
}: MyGroupStoryScrollProps) {
  return (
    <HStack
      spacing={4}
      px={4}
      py={2}
      overflowX="auto"
      bg="white"
      alignItems="center"
    >
      {groups.map((group) => {
        const isSelected = group.id === selectedGroupId;
        return (
          <Flex
            key={group.id}
            direction="column"
            alignItems="center"
            cursor="pointer"
            onClick={() => onSelectGroup(group)}
            transition="transform 0.2s"
            transform={isSelected ? "scale(1.05)" : "scale(1.0)"}
          >
            <Box
              w="120px"
              h="160px"
              borderRadius="15"
              overflow="hidden"
              //borderWidth={isSelected ? "2px" : "1px"}
              borderColor={isSelected ? "brand.500" : "gray.300"}
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.100"
            >
              <Image
                src={group.coverImage}
                alt={group.name}
                objectFit="cover"
                w="100%"
                h="100%"
                opacity={0.7} // Slight transparency for the text to stand out
              />
              <Text
                position="absolute"
                bottom="0"
                fontSize="xs"
                fontWeight="bold"
                color="white"
                textAlign="center"
              >
                {group.nickname}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </HStack>
  );
}
