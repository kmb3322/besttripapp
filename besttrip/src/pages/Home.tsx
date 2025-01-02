import {
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
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
    coverImage:
      "https://images.unsplash.com/photo-1523301343968-6a6ebf61f8ce?auto=format&q=80&w=800",
    members: ["김철수", "이영희", "박영수"],
    places: ["제주도", "우도", "성산일출봉"],
    dates: ["2024-10-12 ~ 2024-10-15"],
    galleryImages: [
      "https://images.unsplash.com/photo-1605175997171-8a2b41fc2603?auto=format&q=80&w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80&w=800",
      "https://images.unsplash.com/photo-1473625341700-0ebc3d13bb1f?auto=format&q=80&w=800",
      // ...
    ],
  },
  {
    id: 2,
    name: "가족 여행",
    nickname: "우리집 최고",
    coverImage:
      "https://images.unsplash.com/photo-1542038784456-b3f2f6bdd25c?auto=format&q=80&w=800",
    members: ["김아빠", "김엄마"],
    places: ["강원도", "주문진", "속초"],
    dates: ["2025-01-01 ~ 2025-01-05"],
    galleryImages: [
      // ...
    ],
  },
  // 원하는 만큼 더미 데이터 추가
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
            fontSize="lg"
            p={4}
            textAlign="center"
            bg="white"
          >
            나의 그룹
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
