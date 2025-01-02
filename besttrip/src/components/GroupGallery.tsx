import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { Group } from "../types/group";

interface GroupGalleryProps {
  group: Group;
}

export default function GroupGallery({ group }: GroupGalleryProps) {
  return (
    <Box px={4} mb={4}>
      <SimpleGrid columns={3} spacing={2}>
        {group.galleryImages.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Gallery-${idx}`}
            objectFit="cover"
            w="100%"
            h="100%"
            borderRadius="md"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
