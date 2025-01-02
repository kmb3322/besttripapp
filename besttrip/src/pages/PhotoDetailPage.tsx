// src/pages/PhotoDetailPage.tsx

import { Box, Image as ChakraImage, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// ↑ react-router-dom의 useLocation, useParams 등을 사용 (라우팅 전략에 따라 달라질 수 있음)

/**
 * PhotoDetailPage는 특정 사진의 src, date, latitude, longitude를 받아
 * 화면에 표시하는 페이지
 */
export default function PhotoDetailPage() {
  // 예시로, GroupGallery에서 링크로 넘긴 state를 받는다 (React Router)
  const location = useLocation();
  // location.state.photo → { src, date, latitude, longitude }

  const { photo } = (location.state as { photo: any }) || {};

  // 안전 처리
  if (!photo) {
    return (
      <Box p={4}>
        <Text>사진 정보가 존재하지 않습니다.</Text>
      </Box>
    );
  }

  const { src, date, latitude, longitude } = photo;

  // 날짜 / 위치 null 체크
  const hasDate = !!date;
  const hasLocation = latitude !== null && longitude !== null;

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        사진 상세 정보
      </Heading>

      {/* 실제 이미지 */}
      <ChakraImage
        src={src}
        alt="detail-img"
        w="100%"
        maxW="500px"
        borderRadius="md"
        mb={4}
      />

      {/* 날짜 */}
      <Text fontWeight="bold">촬영 날짜</Text>
      {hasDate ? (
        <Text mb={2}>
          {(new Date(date)).toLocaleString()}
        </Text>
      ) : (
        <Text color="gray.500" mb={2}>
          날짜 정보가 존재하지 않습니다.
        </Text>
      )}

      {/* 위치 */}
      <Text fontWeight="bold">위치 정보</Text>
      {hasLocation ? (
        <Text>
          위도: {latitude.toFixed(6)}, 경도: {longitude.toFixed(6)}
        </Text>
      ) : (
        <Text color="gray.500">
          위치 정보가 존재하지 않습니다.
        </Text>
      )}
    </Box>
  );
}
