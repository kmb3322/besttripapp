import React, { useState } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Group } from "../types/group";


// Dnd Kit
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 별도로 MouseSensor, TouchSensor 불러오기
import { MouseSensor, TouchSensor } from "@dnd-kit/core";

interface MyGroupStoryScrollProps {
  groups: Group[];
  selectedGroupId: number;
  onSelectGroup: (group: Group) => void;
}

export default function MyGroupStoryScroll({
  groups: initialGroups,
  selectedGroupId,
  onSelectGroup
}: MyGroupStoryScrollProps) {
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  /**
   * 1) MouseSensor + TouchSensor 둘 다 등록
   *   - MouseSensor: 데스크톱용
   *   - TouchSensor: 모바일용
   *   - pressDelay: 길게 누른 뒤 드래그 시작 (300ms 예시)
   */
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // 마우스의 경우 5px 이동하면 드래그 시작
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // 모바일에서 300ms 길게 눌러야 드래그 시작
        tolerance: 5
      }
    })
  );

  // 드래그 시작 시 → 스크롤 잠금
  const handleDragStart = (event: DragStartEvent) => {
    document.body.style.overflow = "hidden";
  };

  // 드래그 종료 시 → 새로운 순서 반영 + 스크롤 복원
  const handleDragEnd = (event: DragEndEvent) => {
    document.body.style.overflow = "auto";

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = groups.findIndex((g) => g.id === Number(active.id));
    const newIndex = groups.findIndex((g) => g.id === Number(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    const newGroups = arrayMove(groups, oldIndex, newIndex);
    setGroups(newGroups);
  };

  // 드래그 도중 취소(ESC 등) → 스크롤 복원
  const handleDragCancel = (event: DragCancelEvent) => {
    document.body.style.overflow = "auto";
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={groups.map((g) => g.id.toString())}
        strategy={horizontalListSortingStrategy}
      >
        <HStack
          spacing={4}
          px={4}
          py={2}
          // 기본 스크롤 가능(수평 스크롤)
          overflowX="auto"
          bg="white"
          alignItems="center"
          /**
           * 2) 모바일에서 터치 시 스크롤과 충돌이 일어나지 않도록
           *    touchAction, WebkitUserSelect 등 설정
           */
          sx={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          {groups.map((group) => (
            <SortableGroupCard
              key={group.id}
              group={group}
              isSelected={group.id === selectedGroupId}
              onSelectGroup={onSelectGroup}
            />
          ))}
        </HStack>
      </SortableContext>
    </DndContext>
  );
}

/**
 * 개별 카드(Draggable) 컴포넌트
 */
interface SortableGroupCardProps {
  group: Group;
  isSelected: boolean;
  onSelectGroup: (group: Group) => void;
}

function SortableGroupCard({
  group,
  isSelected,
  onSelectGroup
}: SortableGroupCardProps) {
  // useSortable: DnD Kit에서 item을 드래그할 수 있게 해주는 훅
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: group.id.toString()
  });

  // transform: 드래그 중 위치 이동에 사용
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : "auto"
  };

  // 날짜 포맷
  const startDate = group.dates[0].split(" ~ ")[0];
  const [year, month] = startDate.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = parseInt(month, 10) - 1;  // "10" → 10 → 10 - 1 = 9
  const monthName = monthNames[monthIndex];    // monthNames[9] = "Oct"

// 3) "Oct 2024" 형식으로 완성
  const formattedDate = `${monthName} ${year}`;

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
        borderRadius="10"
        overflow="hidden"
        // Show pink shadow if selected, none otherwise
        boxShadow={isSelected ? "0 0 0 3px #F56565" : "none"}
        transition="box-shadow 0.2s, transform 0.2s"
        position="relative"
        bg="gray.100"
      >
        {/* Dark Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.4)"
          zIndex="1"
        />
        {/* Image */}
        <Image
          src={group.coverImage}
          alt={group.name}
          objectFit="cover"
          w="100%"
          h="100%"
        />
        {/* Nickname */}
        <Text
          position="absolute"
          bottom="15px"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          textAlign="left"
          zIndex="2"
          p={2}
          width="100%"
        >
          {group.nickname}
        </Text>

        {/* Formatted Date */}
        <Text
          position="absolute"
          bottom="0"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          textAlign="left"
          zIndex="2"
          p={2}
          width="100%"
        >
          {formattedDate}
        </Text>
      </Box>
    </Flex>
  );
}
