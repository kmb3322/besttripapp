import { Box, Flex, Text } from "@chakra-ui/react";
import { TouchEvent, useEffect, useRef, useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import GroupDetail from "../components/GroupDetail";
import GroupGallery from "../components/GroupGallery";
import MyGroupStoryScroll from "../components/MyGroupStoryScroll";
import { Group } from "../types/group";

// Group 인터페이스 예시
// interface Group {
//   id: number;
//   name: string;
//   nickname: string;
//   coverImage: string;
//   members: string[];      // 여기에 실제 프로필 이미지 파일명 배열 (e.g. ["profile1.jpg", ...])
//   places: string[];
//   dates: string[];
//   galleryImages: string[];
// }

const mockGroups: Group[] = [
  {
    id: 1,
    name: "친구들과의 제주도 여행",
    nickname: "제주 불주먹",
    coverImage: "/images/image1.jpg",
    // members: 이제 이름 대신 'profileN.jpg' 형태로
    members: ["profile1.jpg", "profile2.jpg", "profile3.jpg"],
    places: ["제주도", "우도", "성산일출봉"],
    dates: ["2024-10-12 ~ 2024-10-15"],
    galleryImages: [
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.jpg",
    ],
  },
  {
    id: 2,
    name: "가족 여행",
    nickname: "우리집 최고",
    coverImage: "/images/image5.jpg",
    members: ["profile1.jpg", "profile3.jpg"],
    places: ["강원도", "주문진", "속초"],
    dates: ["2025-01-01 ~ 2025-01-05"],
    galleryImages: [
      "/images/image6.jpg",
      "/images/image7.jpg",
      "/images/image8.jpg",
    ],
  },
  {
    id: 3,
    name: "회사 워크샵",
    nickname: "열정 가득 우리팀",
    coverImage: "/images/image9.jpg",
    members: ["profile2.jpg", "profile1.jpg", "profile3.jpg"],
    places: ["서울", "분당", "수원"],
    dates: ["2025-03-10 ~ 2025-03-12"],
    galleryImages: [
      "/images/image10.jpg",
      "/images/image11.jpg",
      "/images/image12.jpg",
    ],
  },
];

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState<Group>(mockGroups[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 헤더 영역 높이 측정
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // 스와이프(드래그) 시작 Y좌표
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsSheetOpen(false); // 새 그룹 선택 시 바텀시트 닫기
  };

  // 터치 시작
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY;
  };

  // 터치 이동
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    // (실시간 드래그 로직 필요 시 작성)
  };

  // 터치 끝
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (startYRef.current !== null) {
      const endY = e.changedTouches[0].clientY;
      const diff = startYRef.current - endY;

      // 스와이프 거리가 50 이상이면 열거나 닫기
      if (diff > 50) {
        setIsSheetOpen(true);
      } else if (diff < -50) {
        setIsSheetOpen(false);
      }

      startYRef.current = null;
    }
  };

  return (
    <Flex w="100vw" h="100vh" position="relative" overflow="hidden">
      {/* 상단 헤더 (나의그룹 + MyGroupStoryScroll) */}
      <Box
        ref={headerRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bg="white"
        boxShadow="md"
        zIndex={10}
      >
        <Text fontWeight="bold" fontSize="lg" p={4} textAlign="center">
          나의 그룹
        </Text>
        <MyGroupStoryScroll
          groups={mockGroups}
          selectedGroupId={selectedGroup.id}
          onSelectGroup={handleSelectGroup}
        />
      </Box>

      {/*
        바텀시트 영역:
        - isSheetOpen = false → headerHeight만큼 내려가도록
        - isSheetOpen = true  → 완전히 위로 translateY(0) → 상단 덮음
      */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="white"
        boxShadow="0 -5px 10px rgba(0,0,0,0.1)"
        zIndex={20}
        borderTopRadius={isSheetOpen ? 0 : "20px"}
        transform={
          isSheetOpen ? "translateY(0)" : `translateY(${headerHeight}px)`
        }
        transition="transform 0.3s ease"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        overflowY="auto"
      >
        {/* 아래 내용: GroupDetail + Gallery */}
        <GroupDetail group={selectedGroup} isHeaderCollapsed={isSheetOpen} />
        <GroupGallery group={selectedGroup} />

        {/* 하단 여백 (탭바 가려짐 방지) */}
        <Box height="100px" />
      </Box>

      {/* 하단 탭바 (항상 최상위 zIndex) */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        zIndex={999}
      >
        <BottomTabBar />
      </Box>
    </Flex>
  );
}
