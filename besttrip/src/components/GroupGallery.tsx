// src/components/GroupGallery.tsx

import {
  Box,
  Image as ChakraImage,
  GridItem,
  SimpleGrid,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router
import { Group } from "../types/group";
import { getPhotoMetadata } from "../utils/getPhotoMetadata";

interface GalleryPhoto {
  src: string;
  date: Date | null;
  latitude: number | null;
  longitude: number | null;
  rowSpan?: number;
  colSpan?: number;
}

interface GroupGalleryProps {
  group: Group;
}

export default function GroupGallery({ group }: GroupGalleryProps) {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function loadMetadata() {
      try {
        const array: GalleryPhoto[] = [];
        for (const src of group.galleryImages) {
          const meta = await getPhotoMetadata(src);
          array.push({
            src,
            date: meta.date,
            latitude: meta.latitude,
            longitude: meta.longitude,
          });
        }

        // 날짜 오름차순
        array.sort((a, b) => {
          const tA = a.date?.getTime() ?? 0;
          const tB = b.date?.getTime() ?? 0;
          return tA - tB;
        });

        // Masonry-like
        const final = array.map((item) => ({
          ...item,
          rowSpan: Math.random() > 0.8 ? 2 : 1,
          colSpan: Math.random() > 0.75 ? 2 : 1,
        }));

        if (isMounted) setPhotos(final);
      } catch (err) {
        console.error("Error loading metadata: ", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadMetadata();

    return () => {
      isMounted = false;
    };
  }, [group.galleryImages]);

  // 사진 클릭 → PhotoDetailPage로 이동
  const handleClickPhoto = (photo: GalleryPhoto) => {
    // React Router: Link state 통해 데이터 전달
    navigate("/photo-detail", {
      state: { photo },
    });
  };

  return (
    <Box px={4} mb={4}>
      {isLoading && (
        <Box textAlign="center" my={4}>
          <Spinner size="lg" />
          <Text mt={2}>Loading EXIF data...</Text>
        </Box>
      )}

      {!isLoading && (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {photos.map((p, idx) => (
            <GridItem
              key={idx}
              rowSpan={p.rowSpan}
              colSpan={p.colSpan}
              overflow="hidden"
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleClickPhoto(p)}
            >
              <ChakraImage
                src={p.src}
                alt={`Gallery-${idx}`}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
