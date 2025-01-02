import { Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiHome, FiSearch, FiUser } from "react-icons/fi";

export default function BottomTabBar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Flex
      as="nav"
      justify="space-around"
      align="center"
      bg="white"
      boxShadow="md"
      py={2}
    >
      <IconButton
        aria-label="홈"
        icon={<FiHome />}
        variant="ghost"
        color={activeTab === "home" ? "brand.500" : "gray.500"}
        onClick={() => setActiveTab("home")}
      />
      <IconButton
        aria-label="검색"
        icon={<FiSearch />}
        variant="ghost"
        color={activeTab === "search" ? "brand.500" : "gray.500"}
        onClick={() => setActiveTab("search")}
      />
      <IconButton
        aria-label="프로필"
        icon={<FiUser />}
        variant="ghost"
        color={activeTab === "profile" ? "brand.500" : "gray.500"}
        onClick={() => setActiveTab("profile")}
      />
    </Flex>
  );
}
