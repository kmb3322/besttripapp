import { Box, Flex, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import GroupDetail from "../components/GroupDetail";
import GroupGallery from "../components/GroupGallery";
import MyGroupStoryScroll from "../components/MyGroupStoryScroll";
import { Group } from "../types/group";

const mockGroups: Group[] = [
  {
    id: 1,
    name: "친구들과의 제주도 여행",
    nickname: "제주불주먹",
    // 표지 사진 (coverImage)
    coverImage: "/images/image1.jpg",
    members: ["김철수", "이영희", "박영수"],
    places: ["제주도", "우도", "성산일출봉"],
    dates: ["2024-10-12 ~ 2024-10-15"],
    // 실제 더미 갤러리 사진들
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
    members: ["김아빠", "김엄마"],
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
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsHeaderCollapsed(false);
  };

  // 스크롤 업 제스처(혹은 드래그 업) 감지를 위한 ref
  const detailRef = useRef<HTMLDivElement>(null);

  const handleScrollOrDragUp = () => {
    // 실제로는 스크롤/드래그 이벤트를 더 정밀하게 감지하여
    // 적절한 시점에 setIsHeaderCollapsed(true) 하도록 구현합니다.
    setIsHeaderCollapsed(true);
  };

  return (
    <Flex direction="column" h="100vh">
      {/* 상단 영역 */}
      {!isHeaderCollapsed && (
        <Box bg="white" boxShadow="md">
          <Text
            fontWeight="bold"
            fontSize="2xl"
            pt={6}
            pb={1}
            pl={5}
            textAlign="left"
            bg="white"
          >
            My Travel Log
          </Text>
          <MyGroupStoryScroll
            groups={mockGroups}
            selectedGroupId={selectedGroup.id}
            onSelectGroup={handleSelectGroup}
          />
        </Box>
      )}

      {/* 그룹 상세 (대표 사진 + 상세 정보) */}
      <Box
        ref={detailRef}
        flex="1"
        overflowY="auto"
        onScroll={() => {
          // 단순히 스크롤이 일정 높이 이상이면 헤더를 접는 로직 예시
          if (detailRef.current && detailRef.current.scrollTop > 50) {
            handleScrollOrDragUp();
          }
        }}
      >
        <GroupDetail
          group={selectedGroup}
          isHeaderCollapsed={isHeaderCollapsed}
        />
        <GroupGallery group={selectedGroup} />
      </Box>

      {/* 하단 탭바 */}
      <BottomTabBar />
    </Flex>
  );
}
