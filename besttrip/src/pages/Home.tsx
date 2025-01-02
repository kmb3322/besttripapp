import { Box, Flex, Text } from "@chakra-ui/react";
import { UIEvent, useRef, useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import GroupDetail from "../components/GroupDetail";
import MyGroupStoryScroll from "../components/MyGroupStoryScroll";
import { Group } from "../types/group";

const mockGroups: Group[] = [
  {
    id: 1,
    name: "친구들과의 제주도 여행",
    nickname: "제주 불주먹",
    coverImage: "/images/image1.jpg",
    members: ["profile1.jpg", "profile2.jpg", "profile3.jpg"],
    places: ["제주도", "우도", "성산일출봉"],
    dates: ["2024-10-12 ~ 2024-10-15"],
    galleryImages: [
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.jpg",
      "/images/IMG_2198.HEIC",
      "/images/IMG_2325.HEIC",
      "/images/IMG_2127.heic",
      "/images/IMG_2124.HEIC",
      "/images/IMG_2123.HEIC",
      "/images/IMG_2121.HEIC",
      "/images/IMG_2120.HEIC",
      "/images/IMG_2118.HEIC",
      "/images/IMG_2119.HEIC",
      "/images/IMG_2117.HEIC",
      "/images/IMG_2115.HEIC",
      "/images/IMG_2109.HEIC",
      "/images/IMG_2198.HEIC",
      
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
  {
    id: 4,
    name: "몰입캠프",
    nickname: "열정 가득 우리팀",
    coverImage: "/images/image1.jpg",
    members: ["홍길동", "김코딩", "박해커"],
    places: ["서울", "분당", "수원"],
    dates: ["2025-03-10 ~ 2025-03-12"],
    galleryImages: [
      "/images/image10.jpg",
      "/images/image11.jpg",
      "/images/image12.jpg",
    ],
  },
  {
    id: 6,
    name: "이얍얍",
    nickname: "열정 가득 우리팀",
    coverImage: "/images/image1.jpg",
    members: ["홍길동", "김코딩", "박해커"],
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

  // 스크롤 위치 감지
  const [scrollTop, setScrollTop] = useState(0);

  // threshold: 이 값을 넘으면 ‘작은 헤더’를 보여준다
  const COLLAPSE_THRESHOLD = 250;

  // 큰 헤더 영역 참조(높이 측정에 필요하다면)
  const bigHeaderRef = useRef<HTMLDivElement>(null);

  // 그룹 선택 시
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 작은 헤더(“축소 헤더”)를 보일지 여부
  const showCollapsedHeader = scrollTop > COLLAPSE_THRESHOLD;

  return (
    <Flex direction="column" h="100vh" bg="#F2F2F2">
      {/* 스크롤 영역 */}
      <Box
        flex="1"
        overflowY="auto"
        onScroll={handleScroll}
      >
        {/* -- (1) 큰 헤더 (스크롤되며 사라짐) -- */}
        <Box ref={bigHeaderRef} bg="white" pb={4}>
          {/* 타이틀 */}
          <Text fontWeight="bold" fontSize={35} ml={5} pt={6} pb={2}>
            My Travel Log
          </Text>

          {/* MyGroupStoryScroll */}
          <Box
            bg="white"
            boxShadow="md"
            pt={4}
            pb={4}
            mb={2}
          >
            <MyGroupStoryScroll
              groups={mockGroups}
              selectedGroupId={selectedGroup.id}
              onSelectGroup={handleSelectGroup}
            />
          </Box>
        </Box>

        {/* -- (2) GroupDetail & 기타 본문 -- */}
        <GroupDetail
          group={selectedGroup}
          // 큰 헤더가 사라지면(=scrollTop > threshold) GroupDetail 내부 이미지를 작게 렌더링
          isHeaderCollapsed={showCollapsedHeader}
        />


        {/* 컨텐츠가 더 있을 경우 ... */}
        <Box height="300px" bg="transparent" />
      </Box>

      {/* -- (3) 작은 헤더 (고정, 조건부 렌더링) -- */}
      {showCollapsedHeader}

      {/* 하단 탭바 (고정) */}
      <Box position="relative" height="60px">
        <BottomTabBar />
      </Box>
    </Flex>
  );
}
