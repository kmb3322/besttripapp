import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Group } from "../types/group";

interface GroupDetailProps {
  group: Group;
  isHeaderCollapsed: boolean;
}

export default function GroupDetail({
  group,
  isHeaderCollapsed,
}: GroupDetailProps) {
  return (
    <Box w="100%" mb={4}>
      {/* 상단 대표 이미지 */}
      <Box position="relative">
        <Image
          src={group.coverImage}
          alt={group.name}
          w="100%"
          h={isHeaderCollapsed ? "200px" : "300px"}
          objectFit="cover"
          transition="height 0.3s ease"
        />
        {/* 그룹 별명 */}
        <Text
          position="absolute"
          bottom="10px"
          left="20px"
          fontSize={isHeaderCollapsed ? "xl" : "2xl"}
          fontWeight="bold"
          color="white"
          textShadow="1px 1px 2px rgba(0,0,0,0.7)"
          transition="font-size 0.3s ease"
        >
          {group.nickname}
        </Text>
      </Box>

      {/* 세부 정보 */}
      <Box px={4} mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          {group.name}
        </Text>
        <Text fontSize="md" color="gray.600" mt={1}>
          일정: {group.dates.join(", ")}
        </Text>
        <Text fontSize="md" color="gray.600">
          장소: {group.places.join(", ")}
        </Text>

        {/* 멤버들 (AvatarGroup 대신 HStack 사용) */}
        <Flex mt={3} alignItems="center">
          <HStack spacing="-10px">
            {group.members.map((member, index) => (
              <Avatar
                key={index}
                name={member}
                // 음수 spacing이 싫다면 marginLeft 등으로 조절 가능
                src={`https://source.boringavatars.com/beam/120/${member}`}
                size="sm"
                border="2px solid white"
              />
            ))}
          </HStack>
          <Text ml={3} fontSize="sm" color="gray.500">
            {group.members.join(", ")}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
