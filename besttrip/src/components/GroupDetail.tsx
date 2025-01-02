import { Box, Button, Image as ChakraImage, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Group } from "../types/group";

// 프리셋: motion(Box)를 확장
const MotionBox = motion(Box);

interface GroupDetailProps {
  group: Group;
  isHeaderCollapsed: boolean; // Home.tsx에서의 isSheetOpen
}

export default function GroupDetail({
  group,
  isHeaderCollapsed,
}: GroupDetailProps) {
  // 아이콘(이미지) 펼침/접힘 상태
  const [areIconsExpanded, setAreIconsExpanded] = useState(false);

  // 클릭 시 펼침 토글
  const handleIconToggle = () => {
    setAreIconsExpanded((prev) => !prev);
  };

  return (
    <Box w="100%" mb={4}>
      {/* 대표 이미지 영역 */}
      <Box
        position="relative"
        borderTopLeftRadius={isHeaderCollapsed ? 0 : "20px"}
        borderTopRightRadius={isHeaderCollapsed ? 0 : "20px"}
        borderBottomRadius={0}
        overflow="hidden"
        transition="all 0.3s ease"
      >
        {/* 실제 배경 이미지 (대표 이미지) */}
        <ChakraImage
          src={group.coverImage}
          alt={group.name}
          w="100%"
          h={isHeaderCollapsed ? "200px" : "300px"}
          objectFit="cover"
          transition="height 0.3s ease"
        />

        {/* 어두운 오버레이 (이미지를 조금 어둡게) */}
        {isHeaderCollapsed && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            // 클릭 이벤트가 통과되도록 pointerEvents="none"
            pointerEvents="none"
            bg="linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2))"
            transition="all 0.3s ease"
            zIndex={1} 
          />
        )}

        {/* 상단: 왼쪽 화살표, 오른쪽 설정 아이콘 */}
        {isHeaderCollapsed && (
          <Flex
            position="absolute"
            top="12px"
            left="12px"
            right="12px"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            zIndex={2} // 오버레이보다 위
          >
            
          </Flex>
        )}

        {/* 바텀시트 열림 시, 이미지 위에 텍스트/버튼/프로필 이미지들 */}
        {isHeaderCollapsed && (
          <>
            {/* 그룹 별명 / 장소 */}
            <Box
              position="absolute"
              bottom="90px"
              left="20px"
              right="20px"
              zIndex={2}
              textAlign="left"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Text fontSize="3xl" fontWeight="bold" color="white" m={-1} mb={-3}>
                {group.nickname}
              </Text>
              <Text fontSize="md" color="white" fontWeight="light" mb={-8}>
              {group.dates.join(", ")}
              </Text>
            </Box>

            {/* 프로필 이미지(겹침) + Invite 버튼 */}
            <Flex
              position="absolute"
              bottom="20px"
              left="20px"
              zIndex={2} // 오버레이보다 위
              alignItems="center"
              gap={3}
            >
              {/* 프로필 이미지들. marginLeft로 절반씩 겹치기. 클릭 시 펼침 토글 */}
              <Flex onClick={handleIconToggle} cursor="pointer">
                {group.members.map((profileImage, index) => (
                  <MotionBox
                    key={index}
                    position="relative"
                    // 첫 번째 이미지는 marginLeft=0, 나머지는 음수/양수
                    animate={{
                      marginLeft:
                        index === 0
                          ? "0px"
                          : areIconsExpanded
                          ? "10px" // 펼침 상태
                          : "-16px", // 겹침 상태(절반 이상)
                    }}
                    transition={{ duration: 0.3 }}
                    zIndex={group.members.length - index}
                  >
                    <ChakraImage
                      src={`/images/${profileImage}`} // 예: profile1.jpg
                      alt={profileImage}
                      boxSize="32px"
                      objectFit="cover"
                      borderRadius="full"
                      border="2px solid white"
                    />
                  </MotionBox>
                ))}
              </Flex>

              {/* Invite 버튼 */}
              <Button
                size="sm"
                borderRadius="full"
                bg="white"
                color="black"
                fontWeight="bold"
                leftIcon={<FiPlus />}
                _hover={{ bg: "gray.200" }}
              >
                Invite
              </Button>
            </Flex>
          </>
        )}
      </Box>

      {/* 바텀시트 닫힘(false) 상태 → 아래쪽(이미지 밖)에 정보 표시 */}
      {!isHeaderCollapsed && (
        <Box px={4} pt={4} textAlign="left">
          <Text fontSize={35} fontWeight="bold" color="black" m={-0.5} mt={-1} mb={0}>
            {group.nickname}
          </Text>
          <Text fontSize={18} fontWeight="light" mt={-1} color="gray.600" >
            {group.name}
          </Text>
          <Text mt={-1} fontSize={18}  color="gray.600" >
            {group.dates.join(", ")}
          </Text>

          {/* 아래에도 프로필 이미지들을 겹쳐 보여줄 수 있음 */}
          <Flex mt={3} alignItems="center">
            {group.members.map((profileImage, index) => (
              <Box
                key={index}
                position="relative"
                mr={index === group.members.length - 1 ? 0 : -4}
                zIndex={group.members.length - index}
              >
                <ChakraImage
                  src={`/images/${profileImage}`}
                  alt={profileImage}
                  boxSize="32px"
                  borderRadius="full"
                  border="2px solid white"
                />
              </Box>
            ))}
            <Text ml={1.5} fontSize="sm" color="gray.500">
              {group.members.join(", ")}
            </Text>
          </Flex>


          
          
        </Box>
      )}
    </Box>
  );
}
